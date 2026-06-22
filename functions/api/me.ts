import { getAuthenticatedUserId } from '../_lib/favorites';
import type { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';

export async function onRequestGet({ request, data }: { request: Request; data: PluginData }) {
  const userId = getAuthenticatedUserId(request, data);

  if (!userId) {
    return Response.json({ authenticated: false }, { status: 401, headers: { 'cache-control': 'no-store' } });
  }

  return Response.json({ authenticated: true, userId }, { headers: { 'cache-control': 'no-store' } });
}
