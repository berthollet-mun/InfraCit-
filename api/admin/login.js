import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { adminConfig, body, checkOrigin, clientIpHash, db, field, handle, HttpError, json, sessionCookie } from '../_shared.js';
import { verifyPassword } from '../_password.js';

function secureEqual(left, right) {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

export async function POST(request) {
  return handle(request, async () => {
    checkOrigin(request);
    const { email, password } = adminConfig();
    const data = await body(request);
    const submittedEmail = field(data, 'email', 180).toLowerCase();
    const submittedPassword = typeof data.password === 'string' ? data.password : '';
    const key = clientIpHash(request);
    const sql = db();
    const [attempt] = await sql`SELECT failures, reset_at FROM ic_login_attempts WHERE ip_key = ${key}`;
    const active = attempt && new Date(attempt.reset_at).getTime() > Date.now();
    if (active && Number(attempt.failures) >= 8) throw new HttpError(429, 'Trop de tentatives. Réessayez dans quelques minutes.');

    const environmentAdmin = secureEqual(submittedEmail, email.toLowerCase()) && secureEqual(submittedPassword, password);
    let authenticatedEmail = environmentAdmin ? email : null;
    if (!environmentAdmin) {
      const [account] = await sql`SELECT email, password_hash FROM ic_admin_users
        WHERE email = ${submittedEmail} AND active = TRUE`;
      if (account && await verifyPassword(submittedPassword, account.password_hash)) {
        authenticatedEmail = account.email;
      }
    }

    if (!authenticatedEmail) {
      const failures = active ? Number(attempt.failures) + 1 : 1;
      const resetAt = active ? new Date(attempt.reset_at).toISOString() : new Date(Date.now() + 15 * 60 * 1000).toISOString();
      await sql`INSERT INTO ic_login_attempts (ip_key, failures, reset_at)
        VALUES (${key}, ${failures}, ${resetAt})
        ON CONFLICT (ip_key) DO UPDATE SET failures = ${failures}, reset_at = ${resetAt}`;
      throw new HttpError(401, 'E-mail ou mot de passe incorrect.');
    }

    await sql`DELETE FROM ic_login_attempts WHERE ip_key = ${key}`;
    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    await sql`INSERT INTO ic_admin_sessions (token_hash, email, expires_at)
      VALUES (${tokenHash}, ${authenticatedEmail}, ${expiresAt})`;
    return json({ email: authenticatedEmail }, 200, { 'Set-Cookie': sessionCookie(token, 43200) });
  });
}
