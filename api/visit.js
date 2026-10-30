import { db, empty, handle } from './_shared.js';

export async function POST(request) {
  return handle(request, async () => {
    const day = new Date().toISOString().slice(0, 10);
    await db()`INSERT INTO ic_visits (day, visit_count) VALUES (${day}, 1)
      ON CONFLICT (day) DO UPDATE SET visit_count = ic_visits.visit_count + 1`;
    return empty();
  });
}
