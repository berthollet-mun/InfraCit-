<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, mixed $value = null): never
{
    http_response_code($status);
    if ($status !== 204) {
        echo json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    }
    exit;
}

set_exception_handler(static function (Throwable $error): void {
    error_log('InfraCité API: ' . $error->getMessage());
    reply(500, ['error' => 'Erreur du serveur. Réessayez plus tard.']);
});

$configFile = dirname(__DIR__, 2) . '/infracite-config.php';
if (!is_file($configFile)) {
    reply(503, ['error' => 'Configuration du serveur indisponible.']);
}

$config = require $configFile;
if (!is_array($config)
    || !is_array($config['database'] ?? null)
    || !is_string($config['admin_email'] ?? null)
    || !is_string($config['admin_password_hash'] ?? null)
    || $config['admin_email'] === ''
    || $config['admin_password_hash'] === '') {
    reply(503, ['error' => 'Configuration du serveur incomplète.']);
}

$databaseConfig = $config['database'];
foreach (['host', 'name', 'user', 'password'] as $key) {
    if (!is_string($databaseConfig[$key] ?? null) || $databaseConfig[$key] === '') {
        reply(503, ['error' => 'Configuration de la base incomplète.']);
    }
}

$db = new PDO(
    'mysql:host=' . $databaseConfig['host'] . ';dbname=' . $databaseConfig['name'] . ';charset=utf8mb4',
    $databaseConfig['user'],
    $databaseConfig['password'],
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

function body(): array
{
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 24576) {
        reply(413, ['error' => 'La demande est trop volumineuse.']);
    }
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 24576) {
        reply(413, ['error' => 'La demande est trop volumineuse.']);
    }
    $data = json_decode($raw, true);
    if (!is_array($data) || array_is_list($data)) {
        reply(400, ['error' => 'Données JSON invalides.']);
    }
    return $data;
}

function field(array $data, string $key, int $limit): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? mb_substr(trim($value), 0, $limit) : '';
}

function uuid(): string
{
    $bytes = random_bytes(16);
    $bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40);
    $bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);
    $hex = bin2hex($bytes);
    return substr($hex, 0, 8) . '-' . substr($hex, 8, 4) . '-' . substr($hex, 12, 4) . '-' . substr($hex, 16, 4) . '-' . substr($hex, 20);
}

function startAdminSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('ic_admin_session');
    session_set_cookie_params([
        'lifetime' => 43200,
        'path' => '/api',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    ini_set('session.gc_maxlifetime', '43200');
    session_start();
}

function requireAdmin(): string
{
    startAdminSession();
    if (!isset($_SESSION['email'], $_SESSION['expires_at']) || (int) $_SESSION['expires_at'] < time()) {
        reply(401, ['error' => 'Session expirée ou absente.']);
    }
    return (string) $_SESSION['email'];
}

function messageRow(array $row): array
{
    return [
        'id' => $row['id'],
        'name' => $row['name'],
        'organisation' => $row['organisation'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'subject' => $row['subject'],
        'message' => $row['message'],
        'status' => $row['status'],
        'createdAt' => $row['created_at'],
    ];
}

function dateOrNull(string $date): ?DateTimeImmutable
{
    $value = DateTimeImmutable::createFromFormat('!Y-m-d', $date, new DateTimeZone('UTC'));
    return $value !== false && $value->format('Y-m-d') === $date ? $value : null;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if ($method === 'GET' && $path === '/api/health') {
    reply(200, ['ok' => true]);
}

if ($method === 'POST' && $path === '/api/visit') {
    $day = gmdate('Y-m-d');
    $statement = $db->prepare('INSERT INTO ic_visits (day, visit_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE visit_count = visit_count + 1');
    $statement->execute([$day]);
    reply(204);
}

if ($method === 'POST' && $path === '/api/contact') {
    $data = body();
    $name = field($data, 'name', 120);
    $organisation = field($data, 'organisation', 120);
    $email = field($data, 'email', 180);
    $phone = field($data, 'phone', 60);
    $subject = field($data, 'subject', 120);
    $message = field($data, 'message', 5000);
    if ($name === '' || $email === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        reply(400, ['error' => 'Vérifiez les champs obligatoires et l’adresse e-mail.']);
    }
    $id = uuid();
    $statement = $db->prepare('INSERT INTO ic_messages (id, name, organisation, email, phone, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $statement->execute([$id, $name, $organisation, $email, $phone, $subject, $message, 'new', gmdate('Y-m-d\TH:i:s\Z')]);
    reply(201, ['id' => $id]);
}

if ($method === 'POST' && $path === '/api/admin/login') {
    $data = body();
    $submittedEmail = mb_strtolower(field($data, 'email', 180));
    $submittedPassword = is_string($data['password'] ?? null) ? $data['password'] : '';
    $ipKey = hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $statement = $db->prepare('SELECT failures, reset_at FROM ic_login_attempts WHERE ip_key = ?');
    $statement->execute([$ipKey]);
    $attempt = $statement->fetch();
    $now = gmdate('Y-m-d\TH:i:s\Z');
    $active = $attempt && $attempt['reset_at'] > $now;
    if ($active && (int) $attempt['failures'] >= 8) {
        reply(429, ['error' => 'Trop de tentatives. Réessayez dans quelques minutes.']);
    }
    if (!hash_equals(mb_strtolower($config['admin_email']), $submittedEmail)
        || !password_verify($submittedPassword, $config['admin_password_hash'])) {
        $failures = $active ? (int) $attempt['failures'] + 1 : 1;
        $resetAt = $active ? $attempt['reset_at'] : gmdate('Y-m-d\TH:i:s\Z', time() + 900);
        $statement = $db->prepare('INSERT INTO ic_login_attempts (ip_key, failures, reset_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE failures = VALUES(failures), reset_at = VALUES(reset_at)');
        $statement->execute([$ipKey, $failures, $resetAt]);
        reply(401, ['error' => 'E-mail ou mot de passe incorrect.']);
    }
    $statement = $db->prepare('DELETE FROM ic_login_attempts WHERE ip_key = ?');
    $statement->execute([$ipKey]);
    startAdminSession();
    session_regenerate_id(true);
    $_SESSION['email'] = $config['admin_email'];
    $_SESSION['expires_at'] = time() + 43200;
    reply(200, ['email' => $config['admin_email']]);
}

if ($method === 'GET' && $path === '/api/admin/session') {
    reply(200, ['email' => requireAdmin()]);
}

if ($method === 'POST' && $path === '/api/admin/logout') {
    requireAdmin();
    $_SESSION = [];
    $cookie = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires' => time() - 3600,
        'path' => $cookie['path'],
        'secure' => $cookie['secure'],
        'httponly' => $cookie['httponly'],
        'samesite' => $cookie['samesite'],
    ]);
    session_destroy();
    reply(204);
}

if ($method === 'GET' && $path === '/api/admin/messages') {
    requireAdmin();
    $rows = $db->query('SELECT id, name, organisation, email, phone, subject, message, status, created_at FROM ic_messages ORDER BY created_at DESC')->fetchAll();
    reply(200, array_map('messageRow', $rows));
}

if ($method === 'PATCH' && preg_match('~^/api/admin/messages/([0-9a-f-]{36})$~', $path, $matches)) {
    requireAdmin();
    $data = body();
    $status = field($data, 'status', 16);
    if (!in_array($status, ['new', 'read', 'archived'], true)) {
        reply(400, ['error' => 'Statut invalide.']);
    }
    $statement = $db->prepare('UPDATE ic_messages SET status = ? WHERE id = ?');
    $statement->execute([$status, $matches[1]]);
    $statement = $db->prepare('SELECT id, name, organisation, email, phone, subject, message, status, created_at FROM ic_messages WHERE id = ?');
    $statement->execute([$matches[1]]);
    $row = $statement->fetch();
    if (!$row) {
        reply(404, ['error' => 'Message introuvable.']);
    }
    reply(200, messageRow($row));
}

if ($method === 'GET' && $path === '/api/admin/dashboard') {
    requireAdmin();
    $to = (string) ($_GET['to'] ?? gmdate('Y-m-d'));
    $from = (string) ($_GET['from'] ?? gmdate('Y-m-d', time() - 6 * 86400));
    $first = dateOrNull($from);
    $last = dateOrNull($to);
    if (!$first || !$last || $last < $first || $first->diff($last)->days > 366) {
        reply(400, ['error' => 'Période invalide. Choisissez au maximum 366 jours.']);
    }
    $after = $last->modify('+1 day')->format('Y-m-d');
    $statement = $db->prepare('SELECT day, visit_count FROM ic_visits WHERE day BETWEEN ? AND ? ORDER BY day');
    $statement->execute([$from, $to]);
    $visits = [];
    foreach ($statement->fetchAll() as $row) {
        $visits[$row['day']] = (int) $row['visit_count'];
    }
    $statement = $db->prepare('SELECT LEFT(created_at, 10) AS day, COUNT(*) AS total FROM ic_messages WHERE created_at >= ? AND created_at < ? GROUP BY LEFT(created_at, 10)');
    $statement->execute([$from . 'T', $after . 'T']);
    $messageCounts = [];
    foreach ($statement->fetchAll() as $row) {
        $messageCounts[$row['day']] = (int) $row['total'];
    }
    $days = [];
    for ($day = $first; $day <= $last; $day = $day->modify('+1 day')) {
        $key = $day->format('Y-m-d');
        $days[] = ['date' => $key, 'visits' => $visits[$key] ?? 0, 'messages' => $messageCounts[$key] ?? 0];
    }
    $statement = $db->prepare("SELECT COUNT(*) AS total, COALESCE(SUM(status = 'new'), 0) AS unread, COALESCE(SUM(status = 'archived'), 0) AS archived FROM ic_messages WHERE created_at >= ? AND created_at < ?");
    $statement->execute([$from . 'T', $after . 'T']);
    $stats = $statement->fetch();
    $statement = $db->prepare('SELECT id, name, organisation, email, phone, subject, message, status, created_at FROM ic_messages WHERE created_at >= ? AND created_at < ? ORDER BY created_at DESC LIMIT 5');
    $statement->execute([$from . 'T', $after . 'T']);
    reply(200, [
        'from' => $from,
        'to' => $to,
        'totalVisits' => array_sum($visits),
        'totalMessages' => (int) $stats['total'],
        'unreadMessages' => (int) $stats['unread'],
        'archivedMessages' => (int) $stats['archived'],
        'days' => $days,
        'recentMessages' => array_map('messageRow', $statement->fetchAll()),
    ]);
}

reply(404, ['error' => 'Route introuvable.']);
