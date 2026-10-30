# API InfraCité : préparation Loopia

Le front React est hébergé sur Vercel. La base MariaDB dédiée à InfraCité existe chez Loopia sous le nom `acv_drc_org_db_1`, sur `mysql334.loopia.se`. Loopia tire le nom d'une base du domaine choisi lors de sa création, mais cette base est distincte de la base WordPress de l'autre site et peut servir à un autre domaine. Les tables `ic_visits`, `ic_messages` et `ic_login_attempts` ont été créées.

**Ne pas utiliser `acv-drc.org` ni ses sous-domaines pour l'API InfraCité.** Le sous-domaine `api-infracite.acv-drc.org` créé pendant la préparation est laissé en place à la demande du propriétaire, mais les fichiers InfraCité en ont été retirés. Il ne doit pas être configuré dans Vercel.

## État et suite

- La base dédiée est prête. L'utilisateur PHP a les droits de lecture, écriture et suppression nécessaires. Les droits `CREATE` et `INDEX` ajoutés temporairement à l'utilisateur phpMyAdmin ont été retirés après l'import du schéma.
- Le code PHP est prêt dans `public_html/api/index.php`. Il n'est actuellement publié sous aucune adresse InfraCité indépendante.
- Pour héberger cette API chez Loopia avec HTTPS, ajouter d'abord au compte un domaine indépendant contrôlé par InfraCité, puis créer un sous-domaine API sous celui-ci. Ne pas modifier le DNS ou les fichiers de `acv-drc.org`.
- Quand l'API répondra en HTTPS sur cette adresse indépendante, router les requêtes Vercel `/api/*` vers elle. Le front utilise déjà ces chemins relatifs.

## Déploiement lorsque l'adresse indépendante est prête

1. Configurer le nouveau sous-domaine en UNIX avec une version PHP prise en charge par Loopia et Apache 2.4, puis activer HTTPS.
2. Copier `infracite-config.example.php` dans le dossier du nouveau sous-domaine, **au-dessus** de `public_html`, sous le nom `infracite-config.php`. Renseigner le compte de base dédié, l'e-mail administrateur et un hash produit par `password_hash(..., PASSWORD_DEFAULT)`. Le fichier réel reste hors de Git et hors du dossier public.
3. Copier `public_html/.htaccess` et `public_html/api/index.php` aux emplacements correspondants sur le nouveau sous-domaine. Aucun build React n'est nécessaire sur Loopia.
4. Vérifier `/api/health`, puis les routes de visite, contact, session et tableau de bord sur l'adresse HTTPS définitive.

Pour préparer le déploiement localement, `deployment.local.example.json` peut être copié en `deployment.local.json`. Ce dernier est ignoré par Git et ne doit être partagé ni dans une conversation ni dans une archive publique.

Le fichier privé `server/data/loopia-migration.sql` peut reprendre les visites et messages locaux après accord de transfert. Ne pas le committer ni l'importer plusieurs fois.
