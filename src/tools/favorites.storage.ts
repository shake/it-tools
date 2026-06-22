import { normalizeFavoriteToolPaths } from '../../shared/favorites';

const FAVORITES_STORAGE_KEY = 'favoriteToolsName';

function hasLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readCachedFavoriteToolPaths() {
  if (!hasLocalStorage()) {
    return [];
  }

  const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return normalizeFavoriteToolPaths(parsedValue.filter((value): value is string => typeof value === 'string'));
  }
  catch {
    return [];
  }
}

export function writeCachedFavoriteToolPaths(paths: readonly string[]) {
  if (!hasLocalStorage()) {
    return;
  }

  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalizeFavoriteToolPaths(paths)));
}
