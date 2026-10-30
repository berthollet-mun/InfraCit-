import { db, handle, json, messageRow, requireAdmin } from '../_shared.js';

export async function GET(request) {
  return handle(request, async () => {
    await requireAdmin(request);
    const rows = await db()`SELECT id, name, organisation, email, phone, subject, message, status, created_at
      FROM ic_messages ORDER BY created_at DESC`;
    return json(rows.map(messageRow));
  });
}
