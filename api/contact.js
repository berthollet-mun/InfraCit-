import { randomUUID } from 'node:crypto';
import { body, checkOrigin, db, field, handle, HttpError, json } from './_shared.js';

export async function POST(request) {
  return handle(request, async () => {
    checkOrigin(request);
    const data = await body(request);
    const name = field(data, 'name', 120);
    const organisation = field(data, 'organisation', 120);
    const email = field(data, 'email', 180);
    const phone = field(data, 'phone', 60);
    const subject = field(data, 'subject', 120);
    const message = field(data, 'message', 5000);
    if (!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new HttpError(400, 'Vérifiez les champs obligatoires et l’adresse e-mail.');
    }
    const id = randomUUID();
    await db()`INSERT INTO ic_messages
      (id, name, organisation, email, phone, subject, message, status, created_at)
      VALUES (${id}, ${name}, ${organisation}, ${email}, ${phone}, ${subject}, ${message}, 'new', NOW())`;
    return json({ id }, 201);
  });
}
