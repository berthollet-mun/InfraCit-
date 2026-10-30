import { createHash } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

const baseHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

let client;
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new HttpError(503, 'Base de données indisponible.');
  client ??= neon(url);
  return client;
}

export function json(value, status = 200, headers = {}) {
  return Response.json(value, { status, headers: { ...baseHeaders, ...headers } });
}

export function empty(status = 204, headers = {}) {
  return new Response(null, { status, headers: { ...baseHeaders, ...headers } });
}

export async function handle(request, action) {
  try {
    return await action(request);
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    console.error('InfraCité API error:', error?.code || error?.name || 'unknown');
    return json({ error: 'Erreur du serveur. Réessayez plus tard.' }, 500);
  }
}

export async function body(request) {
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > 24576) throw new HttpError(413, 'La demande est trop volumineuse.');
  const raw = await request.text();
  if (Buffer.byteLength(raw, 'utf8') > 24576) throw new HttpError(413, 'La demande est trop volumineuse.');
  let value;
  try { value = JSON.parse(raw); } catch { throw new HttpError(400, 'Données JSON invalides.'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new HttpError(400, 'Données JSON invalides.');
  return value;
}

export function field(value, key, max) {
  return typeof value[key] === 'string' ? value[key].trim().slice(0, max) : '';
}

export function checkOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return;
  let url;
  try { url = new URL(origin); } catch { throw new HttpError(403, 'Origine non autorisée.'); }
  if (url.host !== new URL(request.url).host) throw new HttpError(403, 'Origine non autorisée.');
}

export function adminConfig() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new HttpError(503, 'Configuration administrateur indisponible.');
  return { email, password };
}

export function clientIpHash(request) {
  const ip = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for') || 'unknown';
  return createHash('sha256').update(ip.split(',')[0].trim()).digest('hex');
}

export function sessionCookie(token, maxAge) {
  return `ic_admin_session=${token}; Max-Age=${maxAge}; Path=/api; HttpOnly; Secure; SameSite=Strict`;
}

export async function requireAdmin(request) {
  const value = request.headers.get('cookie')?.split(';').map(x => x.trim()).find(x => x.startsWith('ic_admin_session='));
  const token = value?.slice('ic_admin_session='.length) || '';
  if (!/^[0-9a-f]{64}$/.test(token)) throw new HttpError(401, 'Session expirée ou absente.');
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const rows = await db()`SELECT email FROM ic_admin_sessions WHERE token_hash = ${tokenHash} AND expires_at > NOW()`;
  if (!rows.length) throw new HttpError(401, 'Session expirée ou absente.');
  return { email: rows[0].email, tokenHash };
}

export function messageRow(row) {
  return {
    id: row.id,
    name: row.name,
    organisation: row.organisation,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export function dateOrNull(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

export function isoDay(value) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
}
