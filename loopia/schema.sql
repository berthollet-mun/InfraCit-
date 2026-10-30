CREATE TABLE IF NOT EXISTS ic_visits (
    day DATE NOT NULL PRIMARY KEY,
    visit_count INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ic_messages (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    organisation VARCHAR(120) NOT NULL DEFAULT '',
    email VARCHAR(180) NOT NULL,
    phone VARCHAR(60) NOT NULL DEFAULT '',
    subject VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'archived') NOT NULL DEFAULT 'new',
    created_at VARCHAR(30) NOT NULL,
    INDEX ic_messages_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ic_login_attempts (
    ip_key CHAR(64) NOT NULL PRIMARY KEY,
    failures TINYINT UNSIGNED NOT NULL DEFAULT 0,
    reset_at VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
