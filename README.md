# InfraCité Ingénierie — prototype local

Refonte de la page publique en React, TypeScript et Vite, avec un espace administrateur et une API Express pour les visites et les demandes de contact.

## Démarrer

```bash
npm ci
npm run dev
```

Ouvrir `http://127.0.0.1:3000/`.

Prérequis : Node.js 24.15 ou plus récent, utilisé pour le stockage SQLite intégré.

Le bouton **Se connecter** ouvre l'administration. En local, les identifiants de démonstration demandés sont :

- E-mail : `sagelusenge@gmail.com`
- Mot de passe : `12341234`

Les visites sont comptées une fois par session du navigateur. Les visites et les messages envoyés depuis le formulaire sont conservés dans `server/data/site.sqlite` et visibles dans l'administration. Ce fichier est ignoré par Git. Les anciennes données de `server/data/local.json`, si présentes, sont importées automatiquement au premier démarrage et le fichier d'origine est conservé. Le tableau de bord propose les 7 derniers jours, les 30 derniers jours, le mois en cours et une période personnalisée de 366 jours maximum. La réponse à un message ouvre l'application de messagerie de l'administrateur.

## Vérifier

```bash
npm run lint
npm run build
```

## Publication sur Vercel

Le front et les fonctions du dossier `api/` peuvent partager le même domaine `infra-cit.vercel.app`. La base PostgreSQL persistante est à connecter au projet Vercel existant ; voir [vercel/README.md](vercel/README.md). L'accès à ce projet est nécessaire avant la publication. La base Loopia préparée séparément n'est pas utilisée par ces fonctions.

## Points à vérifier avant publication

- Dans Vercel, fournir `DATABASE_URL`, `ADMIN_EMAIL` et `ADMIN_PASSWORD` en variables d'environnement serveur. Utiliser un mot de passe long et unique.
- Pour un hébergement **Node classique** hors Vercel, conserver un volume persistant pour `server/data/site.sqlite`, ou définir `DATABASE_PATH` vers un autre emplacement persistant.
- Les sessions administrateur sont conservées en mémoire et expirent après 12 heures ; un redémarrage du serveur les termine.
- Les photographies de la maquette sont des visuels d'illustration générés. Les remplacer par des photos autorisées de l'entreprise ou de ses missions avant publication.
- Vérifier les coordonnées et mentions légales fournies dans le brief.
- Les anciens écrans de gestion de contenus présents dans le dépôt ne pilotent pas encore la nouvelle page publique.

## Préparation Loopia

Une base MariaDB dédiée et une API PHP compatible avec les mêmes routes ont été préparées chez Loopia. Elles ne sont pas liées au site Vercel actuel et aucun fichier InfraCité n'est publié sous `acv-drc.org`. Les détails sont dans [loopia/README.md](loopia/README.md). Ne publiez jamais le fichier de configuration réel dans Git ou dans `public_html`.
