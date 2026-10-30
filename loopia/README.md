# Déploiement sur Loopia Maison

Le site React est servi comme fichiers statiques ; l'API PHP fournit les mêmes routes que l'API Node locale. La base de données du site doit être distincte de toute base WordPress déjà utilisée par le compte.

## Préparer la base

1. La base MySQL/MariaDB dédiée à InfraCité est créée sur Loopia : `acv_drc_org_db_1`, serveur `mysql334.loopia.se`. Son nom vient du seul domaine actuellement présent dans le compte ; elle est séparée de la base WordPress `acv_drc_org`.
2. Créer un utilisateur de base de données distinct et lui accorder l'accès à cette base. Conserver son mot de passe hors du dépôt.
3. Dans phpMyAdmin, sélectionner cette nouvelle base et importer `schema.sql`.
4. Pour reprendre les données locales, exécuter `node scripts/export-loopia-data.mjs` dans le dépôt. Le fichier privé généré dans `server/data/loopia-migration.sql` est à importer **une seule fois**, après le schéma et avant d'ouvrir le site au public. Il contient les messages de contact et ne doit pas être envoyé dans Git.

## Préparer les fichiers

1. Exécuter `npm ci` puis `npm run build`.
2. Sur le serveur FTP, utiliser le dossier du domaine ou sous-domaine choisi pour InfraCité. Copier `loopia/infracite-config.example.php` dans ce dossier, le renommer `infracite-config.php`, puis renseigner l'hôte, le nom, l'utilisateur et le mot de passe de la nouvelle base. Fournir un e-mail administrateur et un **nouveau** mot de passe long sous forme de hash généré par `password_hash('mot-de-passe', PASSWORD_DEFAULT)` en PHP.
3. Copier le contenu de `dist/` dans `<domaine>/public_html/`, puis `loopia/public_html/.htaccess` et `loopia/public_html/api/index.php` aux mêmes emplacements. Loopia ne sert pas les fichiers situés hors de `public_html` ; le fichier de configuration doit rester dans `<domaine>/infracite-config.php`.
4. Configurer le domaine ou sous-domaine en **UNIX (PHP 8.3/Apache 2.4)** et activer HTTPS. Ne pas changer la configuration du domaine WordPress existant pour publier InfraCité.
5. Vérifier `https://<domaine>/api/health`, puis une visite, un message de contact, la connexion administrateur et le tableau de bord.

Le fichier `.htaccess` dirige `/api/*` vers PHP et les autres chemins inconnus vers `index.html`. Les images et les ressources Vite restent servies directement. Aucun secret ou donnée locale n'est intégré au build React.
