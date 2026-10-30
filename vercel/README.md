# API InfraCité sur le projet Vercel existant

Les fonctions dans `api/` utilisent les mêmes routes `/api/*` que le front React. La base persistante prévue est PostgreSQL (Neon via le Marketplace Vercel). Le site `acv-drc.org` et ses sous-domaines ne sont pas utilisés.

## Avant la publication

1. Utiliser le projet Vercel `infra-cit`, qui sert `infra-cit.vercel.app`.
2. Connecter une base Postgres Neon au **même projet**, dans la région de Francfort. L'intégration fournit `DATABASE_URL`. Les fonctions sont configurées pour tourner à Francfort (`fra1`).
3. Définir `ADMIN_EMAIL` et `ADMIN_PASSWORD` comme variables d'environnement du projet. Employer un mot de passe administrateur long et unique. Ces valeurs restent côté serveur.
4. Appliquer `schema.sql` à la nouvelle base. En local, après `vercel env pull .env.local`, exécuter `npm run migrate:vercel`.
5. Déployer la branche contenant `api/` et `vercel.json`, puis vérifier `/api/health`, `/api/visit`, le formulaire de contact, la connexion administrateur, les messages et les graphiques.

La réécriture dans `vercel.json` envoie `/api/admin/messages/:id` vers la fonction qui change le statut d'un message. Les autres chemins correspondent directement aux fichiers de `api/`.

Les anciennes données du prototype local et les données MariaDB de préparation chez Loopia ne sont pas migrées automatiquement. La base Neon doit être créée dans le projet Vercel réellement utilisé par le site afin de ne pas disperser les messages entre plusieurs comptes.
