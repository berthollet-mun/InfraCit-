import { handle, json, requireAdmin } from '../_shared.js';

export async function GET(request) {
  return handle(request, async () => {
    const session = await requireAdmin(request);
    return json({ email: session.email });
  });
}
