import { db, handle, json } from './_shared.js';
import { ensurePhotoTable, photoSummary } from './_photos.js';

export async function GET(request) {
  return handle(request, async () => {
    await ensurePhotoTable();
    const rows = await db()`SELECT slot_key, alt_text, updated_at FROM ic_site_photos ORDER BY slot_key`;
    return json(rows.map(photoSummary));
  });
}
