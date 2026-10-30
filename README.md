# InfraCité Ingénierie

Refonte de la page publique en React, TypeScript et Vite, avec un espace administrateur et une API Express pour les visites et les demandes de contact.

## Démarrer

```bash
npm ci
npm run dev
```

Ouvrir `http://127.0.0.1:3000/`.

Prérequis : Node.js 24.15 ou plus récent, utilisé pour le stockage SQLite intégré.

Le bouton **Se connecter** ouvre l'administration. Les identifiants de démonstration du serveur local ne doivent pas être utilisés sur le site public.

Les visites sont comptées une fois par session du navigateur. Les visites et les messages envoyés depuis le formulaire sont conservés dans `server/data/site.sqlite` et visibles dans l'administration. Ce fichier est ignoré par Git. Les anciennes données de `server/data/local.json`, si présentes, sont importées automatiquement au premier démarrage et le fichier d'origine est conservé. Le tableau de bord propose les 7 derniers jours, les 30 derniers jours, le mois en cours et une période personnalisée de 366 jours maximum. La réponse à un message ouvre l'application de messagerie de l'administrateur.

## Vérifier

```bash
npm run lint
npm run build
```

## Publication sur Vercel

Le front et les fonctions du dossier `api/` partagent le domaine `infra-cit.vercel.app`. Les fonctions utilisent PostgreSQL via Neon ; voir [vercel/README.md](vercel/README.md). Aucun service InfraCité n'est publié sous `acv-drc.org`.

## Points à vérifier avant publication

- Dans Vercel, fournir `DATABASE_URL`, `ADMIN_EMAIL` et `ADMIN_PASSWORD` en variables d'environnement serveur. Utiliser un mot de passe long et unique.
- Pour un hébergement **Node classique** hors Vercel, conserver un volume persistant pour `server/data/site.sqlite`, ou définir `DATABASE_PATH` vers un autre emplacement persistant.
- En local, les sessions administrateur sont conservées en mémoire. Sur Vercel, elles sont conservées dans PostgreSQL et expirent après 12 heures.
- Les photographies de la maquette sont des visuels d'illustration générés. Les remplacer par des photos autorisées de l'entreprise ou de ses missions avant publication.
- Vérifier les coordonnées et mentions légales fournies dans le brief.
- Les anciens écrans de gestion de contenus présents dans le dépôt ne pilotent pas encore la nouvelle page publique.
