import { checkOrigin, db, empty, handle, requireAdmin, sessionCookie } from '../_shared.js';

export async function POST(request) {
  return handle(request, async () => {
    checkOrigin(request);
    const session = await requireAdmin(request);
    await db()`DELETE FROM ic_admin_sessions WHERE token_hash = ${session.tokenHash}`;
    return empty(204, { 'Set-Cookie': sessionCookie('', 0) });
  });
}
