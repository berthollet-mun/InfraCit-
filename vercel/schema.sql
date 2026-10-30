CREATE TABLE IF NOT EXISTS ic_visits (
    day DATE PRIMARY KEY,
    visit_count BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ic_messages (
    id UUID PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    organisation VARCHAR(120) NOT NULL DEFAULT '',
    email VARCHAR(180) NOT NULL,
    phone VARCHAR(60) NOT NULL DEFAULT '',
    subject VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ic_messages_created_at ON ic_messages (created_at DESC);

CREATE TABLE IF NOT EXISTS ic_login_attempts (
    ip_key CHAR(64) PRIMARY KEY,
    failures SMALLINT NOT NULL DEFAULT 0,
    reset_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS ic_admin_sessions (
    token_hash CHAR(64) PRIMARY KEY,
    email VARCHAR(180) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS ic_admin_sessions_expires_at ON ic_admin_sessions (expires_at);
