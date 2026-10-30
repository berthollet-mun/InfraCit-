import { body, checkOrigin, db, field, handle, HttpError, json, messageRow, requireAdmin } from '../_shared.js';

export async function PATCH(request) {
  return handle(request, async () => {
    checkOrigin(request);
    await requireAdmin(request);
    const id = new URL(request.url).searchParams.get('id') || '';
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      throw new HttpError(404, 'Message introuvable.');
    }
    const data = await body(request);
    const status = field(data, 'status', 16);
    if (!['new', 'read', 'archived'].includes(status)) throw new HttpError(400, 'Statut invalide.');
    const rows = await db()`UPDATE ic_messages SET status = ${status} WHERE id = ${id}
      RETURNING id, name, organisation, email, phone, subject, message, status, created_at`;
    if (!rows.length) throw new HttpError(404, 'Message introuvable.');
    return json(messageRow(rows[0]));
  });
}
