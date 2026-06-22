import type { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';
import { normalizeFavoriteToolPaths } from '../../shared/favorites';

export function getAuthenticatedUserId(request: Request, data?: PluginData) {
  const email = data?.cloudflareAccess.JWT.payload.email?.trim().toLowerCase()
    ?? request.headers.get('cf-access-authenticated-user-email')?.trim().toLowerCase();

  return email || null;
}

export function normalizeStoredFavoriteToolPaths(paths: unknown) {
  if (!Array.isArray(paths)) {
    return [];
  }

  return normalizeFavoriteToolPaths(paths.filter((value): value is string => typeof value === 'string'));
}
