<?php
// Copy to the domain directory as infracite-config.php, next to public_html.
// Keep the real file out of Git and out of public_html.
return [
    'database' => [
        'host' => 'mysql334.loopia.se',
        'name' => 'acv_drc_org_db_1',
        'user' => 'database_user',
        'password' => 'database_password',
    ],
    'admin_email' => 'sagelusenge@gmail.com',
    // Generate with PHP: password_hash('your-long-unique-password', PASSWORD_DEFAULT)
    'admin_password_hash' => 'paste-the-generated-hash-here',
];
