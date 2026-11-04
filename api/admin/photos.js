import { db, handle, HttpError, json, checkOrigin, requireAdmin } from '../_shared.js';
import { ensurePhotoTable, photoSummary, validPhotoKey } from '../_photos.js';

export async function GET(request) {
  return handle(request, async () => {
    await requireAdmin(request);
    await ensurePhotoTable();
    const rows = await db()`SELECT slot_key, alt_text, updated_at FROM ic_site_photos ORDER BY slot_key`;
    return json(rows.map(photoSummary));
  });
}

export async function PUT(request) {
  return handle(request, async () => {
    checkOrigin(request);
    await requireAdmin(request);
    const length = Number(request.headers.get('content-length') || 0);
    if (length > 3_700_000) throw new HttpError(413, 'Image trop volumineuse.');
    const raw = await request.text();
    if (raw.length > 3_700_000) throw new HttpError(413, 'Image trop volumineuse.');
    let payload;
    try { payload = JSON.parse(raw); } catch { throw new HttpError(400, 'Données invalides.'); }
    const key = validPhotoKey(payload?.key);
    const alt = typeof payload?.alt === 'string' ? payload.alt.trim().slice(0, 240) : '';
    if (!alt) throw new HttpError(400, 'La description de l’image est obligatoire.');
    if (typeof payload?.base64 !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(payload.base64)) throw new HttpError(400, 'Image invalide.');
    const binary = Buffer.from(payload.base64, 'base64');
    if (!binary.length || binary.length > 2_700_000) throw new HttpError(413, 'Image trop volumineuse.');
    const jpeg = binary[0] === 0xff && binary[1] === 0xd8 && binary[2] === 0xff;
    const png = binary.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    const webp = binary.toString('ascii', 0, 4) === 'RIFF' && binary.toString('ascii', 8, 12) === 'WEBP';
    const contentType = jpeg ? 'image/jpeg' : png ? 'image/png' : webp ? 'image/webp' : null;
    if (!contentType) throw new HttpError(400, 'Utilisez une photo JPG, PNG ou WebP.');
    await ensurePhotoTable();
    const rows = await db()`INSERT INTO ic_site_photos (slot_key, content_type, data_base64, alt_text, updated_at)
      VALUES (${key}, ${contentType}, ${payload.base64}, ${alt}, NOW())
      ON CONFLICT (slot_key) DO UPDATE SET content_type = EXCLUDED.content_type, data_base64 = EXCLUDED.data_base64,
        alt_text = EXCLUDED.alt_text, updated_at = NOW()
      RETURNING slot_key, alt_text, updated_at`;
    return json(photoSummary(rows[0]));
  });
}

export async function DELETE(request) {
  return handle(request, async () => {
    checkOrigin(request);
    await requireAdmin(request);
    const key = validPhotoKey(new URL(request.url).searchParams.get('slot'));
    await ensurePhotoTable();
    await db()`DELETE FROM ic_site_photos WHERE slot_key = ${key}`;
    return json({ ok: true });
  });
}
