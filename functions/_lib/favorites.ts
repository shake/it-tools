import { normalizeFavoriteToolPaths } from '../../shared/favorites';

export function getAuthenticatedUserId(request: Request) {
  const email = request.headers.get('cf-access-authenticated-user-email')?.trim().toLowerCase();

  return email || null;
}

export function normalizeStoredFavoriteToolPaths(paths: unknown) {
  if (!Array.isArray(paths)) {
    return [];
  }

  return normalizeFavoriteToolPaths(paths.filter((value): value is string => typeof value === 'string'));
}
