import { getAuthenticatedUserId } from '../_lib/favorites';

export async function onRequestGet({ request }: { request: Request }) {
  const userId = getAuthenticatedUserId(request);

  if (!userId) {
    return Response.json({ authenticated: false }, { status: 401, headers: { 'cache-control': 'no-store' } });
  }

  return Response.json({ authenticated: true, userId }, { headers: { 'cache-control': 'no-store' } });
}
