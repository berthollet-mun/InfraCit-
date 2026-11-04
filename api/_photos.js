import { db, HttpError } from './_shared.js';

export const photoKeys = new Set([
  'hero-topographie', 'hero-geomatique', 'hero-urbanisme', 'hero-ingenierie', 'hero-environnement',
  'domaine-ingenierie', 'domaine-geomatique', 'domaine-environnement', 'domaine-territoires',
  'application-territoires', 'application-urbanisme', 'application-sites', 'application-environnement',
]);

export function validPhotoKey(value) {
  if (!photoKeys.has(value)) throw new HttpError(400, 'Emplacement de photo inconnu.');
  return value;
}

let schemaReady;
export function ensurePhotoTable() {
  schemaReady ??= db()`CREATE TABLE IF NOT EXISTS ic_site_photos (
    slot_key VARCHAR(60) PRIMARY KEY,
    content_type VARCHAR(20) NOT NULL,
    data_base64 TEXT NOT NULL,
    alt_text VARCHAR(240) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`.catch((error) => { schemaReady = undefined; throw error; });
  return schemaReady;
}

export function photoSummary(row) {
  return { key: row.slot_key, alt: row.alt_text, version: new Date(row.updated_at).getTime().toString() };
}
