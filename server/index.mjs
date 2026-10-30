import 'dotenv/config';
import express from 'express';
import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { changeMessageStatus, createMessage, getDashboard, listMessages, recordVisit } from './database.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const production = process.argv.includes('--production');
const port = Number(process.env.PORT || (production ? 3000 : 3001));
const host = process.env.HOST || (production ? '0.0.0.0' : '127.0.0.1');
const email = process.env.ADMIN_EMAIL || (production ? '' : 'sagelusenge@gmail.com');
const password = process.env.ADMIN_PASSWORD || (production ? '' : '12341234');
const sessions = new Map();
const attempts = new Map();
const sessionDuration = 12 * 60 * 60 * 1000;

if (!email || !password) {
  throw new Error('Définir ADMIN_EMAIL et ADMIN_PASSWORD avant de lancer le serveur en production.');
}

function secureEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function getSession(req) {
  const cookie = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('ic_admin_session='));
  if (!cookie) return null;
  const token = cookie.slice('ic_admin_session='.length);
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, ...session };
}

function requireAdmin(req, res, next) {
  if (!getSession(req)) return res.status(401).json({ error: 'Session expirée ou absente.' });
  next();
}

function setSessionCookie(res, token, maxAge) {
  const parts = [`ic_admin_session=${token}`, 'HttpOnly', 'SameSite=Strict', 'Path=/api', `Max-Age=${maxAge}`];
  if (production) parts.push('Secure');
  res.setHeader('Set-Cookie', parts.join('; '));
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '24kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/visit', (_req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  recordVisit(today);
  res.status(204).end();
});

app.post('/api/contact', (req, res) => {
  const name = String(req.body.name || '').trim().slice(0, 120);
  const organisation = String(req.body.organisation || '').trim().slice(0, 120);
  const contactEmail = String(req.body.email || '').trim().slice(0, 180);
  const phone = String(req.body.phone || '').trim().slice(0, 60);
  const subject = String(req.body.subject || '').trim().slice(0, 120);
  const message = String(req.body.message || '').trim().slice(0, 5000);
  if (!name || !contactEmail || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return res.status(400).json({ error: 'Vérifiez les champs obligatoires et l’adresse e-mail.' });
  }
  const entry = {
    id: randomUUID(), name, organisation, email: contactEmail, phone, subject, message,
    status: 'new', createdAt: new Date().toISOString(),
  };
  createMessage(entry);
  res.status(201).json({ id: entry.id });
});

app.post('/api/admin/login', (req, res) => {
  const key = req.ip || 'local';
  const record = attempts.get(key) || { count: 0, resetAt: Date.now() + 15 * 60 * 1000 };
  if (record.resetAt < Date.now()) { record.count = 0; record.resetAt = Date.now() + 15 * 60 * 1000; }
  if (record.count >= 8) return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' });

  const submittedEmail = String(req.body.email || '').trim().toLowerCase();
  const submittedPassword = String(req.body.password || '');
  if (!secureEqual(submittedEmail, email.toLowerCase()) || !secureEqual(submittedPassword, password)) {
    record.count += 1;
    attempts.set(key, record);
    return res.status(401).json({ error: 'E-mail ou mot de passe incorrect.' });
  }
  attempts.delete(key);
  const token = randomBytes(32).toString('hex');
  sessions.set(token, { email, expiresAt: Date.now() + sessionDuration });
  setSessionCookie(res, token, Math.floor(sessionDuration / 1000));
  res.json({ email });
});

app.get('/api/admin/session', requireAdmin, (req, res) => res.json({ email: getSession(req).email }));

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  sessions.delete(getSession(req).token);
  setSessionCookie(res, '', 0);
  res.status(204).end();
});

app.get('/api/admin/dashboard', requireAdmin, (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date();
  weekAgo.setUTCDate(weekAgo.getUTCDate() - 6);
  const from = String(req.query.from || weekAgo.toISOString().slice(0, 10));
  const to = String(req.query.to || today);
  const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`));
  const duration = (Date.parse(`${to}T12:00:00Z`) - Date.parse(`${from}T12:00:00Z`)) / 86400000;
  if (!validDate(from) || !validDate(to) || duration < 0 || duration > 366) {
    return res.status(400).json({ error: 'Période invalide. Choisissez au maximum 366 jours.' });
  }
  res.json(getDashboard(from, to));
});

app.get('/api/admin/messages', requireAdmin, (_req, res) => res.json(listMessages()));

app.patch('/api/admin/messages/:id', requireAdmin, (req, res) => {
  const status = String(req.body.status || '');
  if (!['new', 'read', 'archived'].includes(status)) return res.status(400).json({ error: 'Statut invalide.' });
  const message = changeMessageStatus(req.params.id, status);
  if (!message) return res.status(404).json({ error: 'Message introuvable.' });
  res.json(message);
});

if (production) {
  const dist = join(root, 'dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(join(dist, 'index.html')));
}

app.listen(port, host, () => {
  console.log(`InfraCité ${production ? 'site + API' : 'API'} : http://${host}:${port}`);
});
