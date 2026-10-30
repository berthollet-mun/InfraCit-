# API InfraCité chez Loopia

Le front React reste hébergé sur Vercel. Loopia héberge uniquement l'API PHP sur `api-infracite.acv-drc.org` et la base MariaDB dédiée `acv_drc_org_db_1` sur `mysql334.loopia.se`. Le domaine principal `acv-drc.org` et sa base WordPress ne sont pas modifiés.

## Base de données

1. Dans phpMyAdmin, choisir `acv_drc_org_db_1` puis exécuter `schema.sql` pour créer `ic_visits`, `ic_messages` et `ic_login_attempts`.
2. L'utilisateur phpMyAdmin ne nécessite les droits `CREATE` et `INDEX` que pendant cet import. Retirer ces deux droits dès que les tables sont créées. L'utilisateur PHP doit conserver uniquement les droits nécessaires à l'exécution (lecture, écriture et suppression).
3. Si les données locales doivent être reprises, lancer `node scripts/export-loopia-data.mjs`. Le fichier privé `server/data/loopia-migration.sql` contient les messages de contact. L'importer une seule fois après le schéma, avec l'accord de transfert des données. Ne jamais le committer ni le copier dans le dossier public.

## API PHP

1. Dans Loopia, configurer `api-infracite.acv-drc.org` en UNIX avec PHP 8.4 et Apache 2.4, et activer HTTPS.
2. Copier `infracite-config.example.php` dans le dossier du sous-domaine, **au-dessus** de `public_html`, sous le nom `infracite-config.php`. Y renseigner l'utilisateur et le mot de passe de la base, l'e-mail administrateur et un hash de mot de passe administrateur produit par `password_hash(..., PASSWORD_DEFAULT)`. Le fichier réel reste hors de Git et hors du dossier public.
   Pour préparer le déploiement localement, copier `deployment.local.example.json` en `deployment.local.json` et y saisir les identifiants FTP et MariaDB ainsi qu'un mot de passe administrateur unique. Ce fichier est ignoré par Git ; ne le partager ni dans une conversation ni dans une archive publique.
3. Copier `public_html/.htaccess` et `public_html/api/index.php` dans les emplacements correspondants du dossier du sous-domaine. Aucun build React n'est nécessaire sur Loopia.
4. Vérifier `https://api-infracite.acv-drc.org/api/health`, puis les routes de visite, contact, session et tableau de bord.

## DNS et connexion au front

Les serveurs de noms publics de `acv-drc.org` ne sont pas ceux de Loopia. Créer chez le fournisseur DNS actuel un enregistrement **A** `api-infracite` vers `93.188.2.52` (adresse indiquée par le DNS Loopia), sans modifier les autres enregistrements ni les serveurs de noms. Vérifier la résolution publique et le certificat HTTPS avant de router les requêtes du front Vercel `/api/*` vers cette API. Le domaine `infracite.fr` est remis à plus tard.

La configuration du proxy Vercel doit conserver le chemin `/api/*` et transmettre les cookies de session, pour que le front continue à utiliser les mêmes URLs relatives. Ne pas publier ce proxy tant que l'API et HTTPS ne sont pas opérationnels.
