export const sitePhotos = [
  { key: 'hero-topographie', section: 'Accueil · Diaporama', label: '01 · Topographie & mesure', defaultImage: '/images/hero-topographie.jpg', alt: 'Topographe au travail sur le terrain' },
  { key: 'hero-geomatique', section: 'Accueil · Diaporama', label: '02 · Cartographie & SIG', defaultImage: '/images/hero-geomatique.jpg', alt: 'Cartographie et données géomatiques' },
  { key: 'hero-urbanisme', section: 'Accueil · Diaporama', label: '03 · Urbanisme opérationnel', defaultImage: '/images/hero-urbanisme.jpg', alt: 'Vue aérienne d’un quartier urbain' },
  { key: 'hero-ingenierie', section: 'Accueil · Diaporama', label: '04 · Ingénierie & conseil', defaultImage: '/images/hero-ingenierie.jpg', alt: 'Ingénieurs étudiant un projet' },
  { key: 'hero-environnement', section: 'Accueil · Diaporama', label: '05 · Environnement', defaultImage: '/images/hero-environnement.jpg', alt: 'Paysage naturel et environnement' },
  { key: 'domaine-ingenierie', section: '01 · Domaines d’intervention', label: 'Ingénierie', defaultImage: '/images/hero-ingenierie.jpg', alt: 'Ingénieurs consultant des plans sur un chantier d’infrastructure' },
  { key: 'domaine-geomatique', section: '01 · Domaines d’intervention', label: 'Géomatique', defaultImage: '/images/hero-topographie.jpg', alt: 'Topographe utilisant une station totale sur le terrain' },
  { key: 'domaine-environnement', section: '01 · Domaines d’intervention', label: 'Environnement', defaultImage: '/images/hero-environnement.jpg', alt: 'Bassin versant et zone humide dans un paysage aménagé' },
  { key: 'domaine-territoires', section: '01 · Domaines d’intervention', label: 'Territoires', defaultImage: '/images/hero-urbanisme.jpg', alt: 'Vue aérienne d’un quartier et de ses espaces publics' },
  { key: 'application-territoires', section: '03 · Champs d’application', label: 'Dynamiques territoriales', defaultImage: '/images/hero-urbanisme.jpg', alt: 'Vue aérienne d’un territoire urbanisé' },
  { key: 'application-urbanisme', section: '03 · Champs d’application', label: 'Urbanisme opérationnel', defaultImage: '/images/hero-ingenierie.jpg', alt: 'Projet d’infrastructure en cours d’étude' },
  { key: 'application-sites', section: '03 · Champs d’application', label: 'Représentation des sites', defaultImage: '/images/hero-geomatique.jpg', alt: 'Analyse géomatique sur des cartes numériques' },
  { key: 'application-environnement', section: '03 · Champs d’application', label: 'Enjeux environnementaux', defaultImage: '/images/hero-environnement.jpg', alt: 'Paysage de zone humide et bassin versant' },
] as const;

export type SitePhotoKey = typeof sitePhotos[number]['key'];
export type SitePhotoOverride = { key: SitePhotoKey; version: string; alt: string };

export function photoUrl(key: SitePhotoKey, overrides: SitePhotoOverride[]) {
  const item = sitePhotos.find((photo) => photo.key === key)!;
  const override = overrides.find((photo) => photo.key === key);
  return override ? `/api/site-image?slot=${key}&v=${encodeURIComponent(override.version)}` : item.defaultImage;
}

export function photoAlt(key: SitePhotoKey, overrides: SitePhotoOverride[]) {
  const item = sitePhotos.find((photo) => photo.key === key)!;
  return overrides.find((photo) => photo.key === key)?.alt || item.alt;
}
