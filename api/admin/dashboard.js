import { dateOrNull, db, handle, HttpError, isoDay, json, messageRow, requireAdmin } from '../_shared.js';

export async function GET(request) {
  return handle(request, async () => {
    await requireAdmin(request);
    const url = new URL(request.url);
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setUTCDate(weekAgo.getUTCDate() - 6);
    const from = url.searchParams.get('from') || weekAgo.toISOString().slice(0, 10);
    const to = url.searchParams.get('to') || today.toISOString().slice(0, 10);
    const first = dateOrNull(from);
    const last = dateOrNull(to);
    if (!first || !last || last < first || (last - first) / 86400000 > 366) {
      throw new HttpError(400, 'Période invalide. Choisissez au maximum 366 jours.');
    }
    const after = new Date(last);
    after.setUTCDate(after.getUTCDate() + 1);
    const afterIso = after.toISOString();
    const fromIso = first.toISOString();
    const sql = db();
    const [visitRows, countRows, statRows, recentRows] = await Promise.all([
      sql`SELECT day, visit_count FROM ic_visits WHERE day BETWEEN ${from} AND ${to} ORDER BY day`,
      sql`SELECT (created_at AT TIME ZONE 'UTC')::date AS day, COUNT(*)::int AS total
        FROM ic_messages WHERE created_at >= ${fromIso} AND created_at < ${afterIso}
        GROUP BY (created_at AT TIME ZONE 'UTC')::date`,
      sql`SELECT COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'new')::int AS unread,
        COUNT(*) FILTER (WHERE status = 'archived')::int AS archived
        FROM ic_messages WHERE created_at >= ${fromIso} AND created_at < ${afterIso}`,
      sql`SELECT id, name, organisation, email, phone, subject, message, status, created_at
        FROM ic_messages WHERE created_at >= ${fromIso} AND created_at < ${afterIso}
        ORDER BY created_at DESC LIMIT 5`,
    ]);
    const visits = new Map(visitRows.map(row => [isoDay(row.day), Number(row.visit_count)]));
    const messages = new Map(countRows.map(row => [isoDay(row.day), Number(row.total)]));
    const days = [];
    for (let cursor = new Date(first); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const date = cursor.toISOString().slice(0, 10);
      days.push({ date, visits: visits.get(date) || 0, messages: messages.get(date) || 0 });
    }
    const stats = statRows[0];
    return json({
      from, to,
      totalVisits: [...visits.values()].reduce((sum, count) => sum + count, 0),
      totalMessages: Number(stats.total),
      unreadMessages: Number(stats.unread),
      archivedMessages: Number(stats.archived),
      days,
      recentMessages: recentRows.map(messageRow),
    });
  });
}
