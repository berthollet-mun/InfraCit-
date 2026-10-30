import { DatabaseSync } from 'node:sqlite';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const databasePath = join(root, 'server', 'data', 'site.sqlite');
const outputPath = join(root, 'server', 'data', 'loopia-migration.sql');

if (!existsSync(databasePath)) throw new Error('Base locale introuvable : server/data/site.sqlite');
if (existsSync(outputPath)) throw new Error('Export existant : supprimez-le manuellement après sauvegarde avant de recommencer.');

const database = new DatabaseSync(databasePath, { readOnly: true });
const visits = database.prepare('SELECT day, count FROM visits ORDER BY day').all();
const messages = database.prepare('SELECT id, name, organisation, email, phone, subject, message, status, createdAt FROM messages ORDER BY createdAt').all();
database.close();

function sqlText(value) {
  const encoded = Buffer.from(String(value ?? ''), 'utf8').toString('hex');
  return encoded ? `CONVERT(0x${encoded} USING utf8mb4)` : "''";
}

const lines = [
  '-- Importer dans la nouvelle base InfraCité après schema.sql, avant ouverture du site.',
  '-- Ce fichier contient des messages privés. Ne pas le committer ni le publier.',
  'START TRANSACTION;',
];

for (const visit of visits) {
  lines.push(`INSERT INTO ic_visits (day, visit_count) VALUES (${sqlText(visit.day)}, ${Math.max(0, Number(visit.count) || 0)}) ON DUPLICATE KEY UPDATE visit_count = GREATEST(visit_count, VALUES(visit_count));`);
}

for (const item of messages) {
  const values = [item.id, item.name, item.organisation, item.email, item.phone, item.subject, item.message, item.status, item.createdAt].map(sqlText);
  lines.push(`INSERT IGNORE INTO ic_messages (id, name, organisation, email, phone, subject, message, status, created_at) VALUES (${values.join(', ')});`);
}

lines.push('COMMIT;', '');
writeFileSync(outputPath, lines.join('\n'), { encoding: 'utf8', mode: 0o600, flag: 'wx' });
console.log(`Export privé créé : ${outputPath} (${visits.length} jours, ${messages.length} messages).`);
