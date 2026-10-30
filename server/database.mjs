import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const databasePath = process.env.DATABASE_PATH || join(root, 'server', 'data', 'site.sqlite');
const legacyFile = join(root, 'server', 'data', 'local.json');
mkdirSync(dirname(databasePath), { recursive: true });

const database = new DatabaseSync(databasePath);
database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS visits (
    day TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    organisation TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    createdAt TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS messages_created_at ON messages(createdAt DESC);
  CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);

function migrateLegacyData() {
  if (!existsSync(legacyFile)) return;
  if (database.prepare('SELECT value FROM metadata WHERE key = ?').get('legacy_json_migrated')) return;

  let legacy;
  try {
    legacy = JSON.parse(readFileSync(legacyFile, 'utf8'));
  } catch {
    console.warn('Ancien fichier JSON illisible : migration ignorée.');
    return;
  }

  database.exec('BEGIN');
  try {
    const addVisit = database.prepare('INSERT OR IGNORE INTO visits(day, count) VALUES (?, ?)');
    for (const [day, count] of Object.entries(legacy.visits || {})) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(day)) addVisit.run(day, Math.max(0, Number(count) || 0));
    }
    const addMessage = database.prepare('INSERT OR IGNORE INTO messages(id, name, organisation, email, phone, subject, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const item of Array.isArray(legacy.messages) ? legacy.messages : []) {
      if (!item.id || !item.name || !item.email || !item.subject || !item.message) continue;
      addMessage.run(item.id, item.name, item.organisation || '', item.email, item.phone || '', item.subject, item.message, ['new', 'read', 'archived'].includes(item.status) ? item.status : 'new', item.createdAt || new Date().toISOString());
    }
    database.prepare('INSERT INTO metadata(key, value) VALUES (?, ?)').run('legacy_json_migrated', new Date().toISOString());
    database.exec('COMMIT');
    console.log('Visites et messages JSON repris dans SQLite.');
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  }
}

migrateLegacyData();

export function recordVisit(day) {
  database.prepare('INSERT INTO visits(day, count) VALUES (?, 1) ON CONFLICT(day) DO UPDATE SET count = count + 1').run(day);
}

export function createMessage(entry) {
  database.prepare('INSERT INTO messages(id, name, organisation, email, phone, subject, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .run(entry.id, entry.name, entry.organisation, entry.email, entry.phone, entry.subject, entry.message, entry.status, entry.createdAt);
}

export function listMessages() {
  return database.prepare('SELECT * FROM messages ORDER BY createdAt DESC').all();
}

export function changeMessageStatus(id, status) {
  const result = database.prepare('UPDATE messages SET status = ? WHERE id = ?').run(status, id);
  if (result.changes === 0) return null;
  return database.prepare('SELECT * FROM messages WHERE id = ?').get(id);
}

export function getDashboard(from, to) {
  const visits = database.prepare('SELECT day, count FROM visits WHERE day BETWEEN ? AND ? ORDER BY day').all(from, to);
  const messageCounts = database.prepare("SELECT substr(createdAt, 1, 10) AS day, count(*) AS count FROM messages WHERE substr(createdAt, 1, 10) BETWEEN ? AND ? GROUP BY day").all(from, to);
  const visitMap = new Map(visits.map((row) => [row.day, row.count]));
  const messageMap = new Map(messageCounts.map((row) => [row.day, row.count]));
  const days = [];
  for (let cursor = new Date(`${from}T12:00:00Z`); cursor.toISOString().slice(0, 10) <= to; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = cursor.toISOString().slice(0, 10);
    days.push({ date, visits: visitMap.get(date) || 0, messages: messageMap.get(date) || 0 });
  }
  const messageStats = database.prepare("SELECT count(*) AS total, sum(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS unread, sum(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) AS archived FROM messages WHERE substr(createdAt, 1, 10) BETWEEN ? AND ?").get(from, to);
  const recentMessages = database.prepare('SELECT * FROM messages WHERE substr(createdAt, 1, 10) BETWEEN ? AND ? ORDER BY createdAt DESC LIMIT 5').all(from, to);
  return {
    from,
    to,
    totalVisits: visits.reduce((sum, row) => sum + row.count, 0),
    totalMessages: messageStats.total || 0,
    unreadMessages: messageStats.unread || 0,
    archivedMessages: messageStats.archived || 0,
    days,
    recentMessages,
  };
}
