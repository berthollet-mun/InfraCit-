import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const derive = promisify(pbkdf2);
const iterations = 310000;
const keyLength = 32;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await derive(password, salt, iterations, keyLength, 'sha256');
  return `pbkdf2_sha256$${iterations}$${salt.toString('hex')}$${hash.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  const match = /^pbkdf2_sha256\$(\d+)\$([0-9a-f]{32})\$([0-9a-f]{64})$/.exec(stored || '');
  if (!match) return false;
  const rounds = Number(match[1]);
  if (rounds < 100000 || rounds > 1000000) return false;
  const salt = Buffer.from(match[2], 'hex');
  const expected = Buffer.from(match[3], 'hex');
  const actual = await derive(password, salt, rounds, expected.length, 'sha256');
  return timingSafeEqual(actual, expected);
}
