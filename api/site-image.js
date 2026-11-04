import { db, handle, HttpError } from './_shared.js';
import { ensurePhotoTable, validPhotoKey } from './_photos.js';

export async function GET(request) {
  return handle(request, async () => {
    const key = validPhotoKey(new URL(request.url).searchParams.get('slot'));
    await ensurePhotoTable();
    const rows = await db()`SELECT content_type, data_base64, updated_at FROM ic_site_photos WHERE slot_key = ${key}`;
    if (!rows.length) throw new HttpError(404, 'Photo introuvable.');
    const row = rows[0];
    const buffer = Buffer.from(row.data_base64, 'base64');
    const version = new Date(row.updated_at).getTime().toString();
    return new Response(buffer, { headers: {
      'Content-Type': row.content_type,
      'Content-Length': String(buffer.length),
      'Cache-Control': new URL(request.url).searchParams.get('v') === version ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    } });
  });
}
