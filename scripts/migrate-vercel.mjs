import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL doit être défini pour appliquer le schéma.');
const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(fileURLToPath(new URL('../vercel/schema.sql', import.meta.url)), 'utf8');
const statements = schema.split(/;\s*(?:\r?\n|$)/).map(value => value.trim()).filter(Boolean);
for (const statement of statements) {
  await sql.query(statement);
}
console.log(`${statements.length} requêtes de schéma appliquées.`);
