import { db, handle, json } from './_shared.js';

export async function GET(request) {
  return handle(request, async () => {
    await db()`SELECT 1`;
    return json({ ok: true });
  });
}
