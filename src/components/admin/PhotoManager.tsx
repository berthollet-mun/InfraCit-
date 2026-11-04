import { useEffect, useState, type ChangeEvent } from 'react';
import { ImagePlus, RotateCcw, Upload } from 'lucide-react';
import { photoUrl, sitePhotos, type SitePhotoOverride } from '../../data/sitePhotos';
import './photo-manager.css';

async function loadPhotos(): Promise<SitePhotoOverride[]> {
  const response = await fetch('/api/admin/photos', { credentials: 'same-origin' });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Chargement des photos impossible.');
  return data;
}

async function compress(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL('image/webp', 0.82);
    const base64 = result.split(',')[1];
    if (base64.length > 3_600_000) throw new Error('Cette photo reste trop volumineuse. Choisissez une autre image.');
    return base64;
  } finally { bitmap.close(); }
}

export function PhotoManager() {
  const [overrides, setOverrides] = useState<SitePhotoOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyKey, setBusyKey] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [alts, setAlts] = useState<Record<string, string>>({});

  useEffect(() => {
    loadPhotos().then(setOverrides).catch((cause) => setError(cause.message)).finally(() => setLoading(false));
  }, []);

  function selectFile(key: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choisissez une image JPG, PNG ou WebP.'); return; }
    setError('');
    setSelectedFiles((current) => ({ ...current, [key]: file }));
    setPreviews((current) => ({ ...current, [key]: URL.createObjectURL(file) }));
  }

  async function save(key: string, alt: string) {
    const file = selectedFiles[key];
    if (!file) return;
    setBusyKey(key);
    setError('');
    try {
      const base64 = await compress(file);
      const response = await fetch('/api/admin/photos', { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, alt, base64 }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Enregistrement impossible.');
      setOverrides((current) => [...current.filter((item) => item.key !== key), data]);
      setSelectedFiles((current) => { const next = { ...current }; delete next[key]; return next; });
      setPreviews((current) => { const next = { ...current }; delete next[key]; return next; });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Enregistrement impossible.'); }
    finally { setBusyKey(''); }
  }

  async function reset(key: string) {
    if (!window.confirm('Rétablir la photo d’origine pour cet emplacement ?')) return;
    setBusyKey(key);
    setError('');
    try {
      const response = await fetch(`/api/admin/photos?slot=${encodeURIComponent(key)}`, { method: 'DELETE', credentials: 'same-origin' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Réinitialisation impossible.');
      setOverrides((current) => current.filter((item) => item.key !== key));
      setAlts((current) => { const next = { ...current }; delete next[key]; return next; });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Réinitialisation impossible.'); }
    finally { setBusyKey(''); }
  }

  return <div className="photo-manager">
    <div className="admin-page-heading"><div><span className="admin-kicker">CONTENU DU SITE</span><h1>Photos<span>.</span></h1><p>Chaque carte correspond à un emplacement précis sur le site. Choisissez une photo, décrivez-la, puis enregistrez.</p></div><span className="admin-period">{sitePhotos.length} EMPLACEMENTS</span></div>
    {error && <div className="admin-error" role="alert">{error}</div>}
    {loading ? <p>Chargement des photos…</p> : [...new Set(sitePhotos.map((item) => item.section))].map((section) => <section className="photo-section" key={section} aria-label={section}>
      <h2>{section}</h2><div className="photo-grid">{sitePhotos.filter((item) => item.section === section).map((item) => {
        const override = overrides.find((photo) => photo.key === item.key);
        const alt = alts[item.key] ?? override?.alt ?? item.alt;
        const preview = previews[item.key] || photoUrl(item.key, overrides);
        return <article className="photo-card" key={item.key}>
          <div className="photo-card-image"><img src={preview} alt={alt} /><span>{override ? 'Photo personnalisée' : 'Photo d’origine'}</span></div>
          <div className="photo-card-body"><h3>{item.label}</h3><p>{section}</p>
            <label className="photo-file-button"><ImagePlus size={17} /> Choisir une photo<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectFile(item.key, event)} /></label>
            {selectedFiles[item.key] && <small className="photo-filename">{selectedFiles[item.key].name}</small>}
            <label className="photo-alt-label" htmlFor={`alt-${item.key}`}>Description de la photo</label>
            <input id={`alt-${item.key}`} className="photo-alt-input" value={alt} maxLength={240} onChange={(event) => setAlts((current) => ({ ...current, [item.key]: event.target.value }))} />
            <div className="photo-card-actions"><button type="button" disabled={!selectedFiles[item.key] || !alt.trim() || busyKey === item.key} onClick={() => void save(item.key, alt)}><Upload size={16} /> {busyKey === item.key ? 'En cours…' : 'Enregistrer'}</button>{override && <button type="button" className="photo-reset" disabled={busyKey === item.key} onClick={() => void reset(item.key)}><RotateCcw size={15} /> Origine</button>}</div>
          </div>
        </article>;
      })}</div>
    </section>)}
  </div>;
}
