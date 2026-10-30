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

## Avant publication

- La mise en ligne doit fournir `ADMIN_EMAIL` et `ADMIN_PASSWORD` en variables d'environnement ; le serveur refuse de démarrer en mode production sans elles. Utiliser un mot de passe long et unique.
- Héberger l'API sur un serveur Node avec un volume persistant pour `server/data/site.sqlite`, ou définir `DATABASE_PATH` vers un autre emplacement persistant. Un hébergement statique seul ne peut pas recevoir les demandes de contact ni conserver les visites.
- Les sessions administrateur sont conservées en mémoire et expirent après 12 heures ; un redémarrage du serveur les termine.
- Les photographies de la maquette sont des visuels d'illustration générés. Les remplacer par des photos autorisées de l'entreprise ou de ses missions avant publication.
- Vérifier les coordonnées et mentions légales fournies dans le brief.
- Les anciens écrans de gestion de contenus présents dans le dépôt ne pilotent pas encore la nouvelle page publique.
