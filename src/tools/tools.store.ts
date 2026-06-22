import { type MaybeRef, get } from '@vueuse/core';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { normalizeFavoriteToolPaths } from '../../shared/favorites';
import type { Tool, ToolCategory, ToolWithCategory } from './tools.types';
import { readCachedFavoriteToolPaths, writeCachedFavoriteToolPaths } from './favorites.storage';
import { toolsWithCategory } from './index';

const FAVORITES_API_PATH = '/api/favorites';

const favoriteToolPaths = ref<string[]>([]);
const favoriteSyncMode = ref<'loading' | 'remote' | 'local'>('loading');

let favoriteHydrationPromise: Promise<void> | null = null;
let favoritePersistenceQueue = Promise.resolve();

async function fetchFavoriteToolPaths() {
  const response = await fetch(FAVORITES_API_PATH, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load favorites (${response.status})`);
  }

  const payload = await response.json() as { favoriteToolPaths?: unknown };

  if (!Array.isArray(payload.favoriteToolPaths)) {
    return [];
  }

  return normalizeFavoriteToolPaths(payload.favoriteToolPaths.filter((value): value is string => typeof value === 'string'));
}

async function saveFavoriteToolPaths(paths: string[]) {
  const response = await fetch(FAVORITES_API_PATH, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ favoriteToolPaths: normalizeFavoriteToolPaths(paths) }),
  });

  if (response.status === 401 || response.status === 403) {
    return false;
  }

  if (!response.ok) {
    throw new Error(`Failed to save favorites (${response.status})`);
  }

  return true;
}

function queueFavoritePersistence() {
  const currentFavoriteToolPaths = normalizeFavoriteToolPaths(favoriteToolPaths.value);

  favoritePersistenceQueue = favoritePersistenceQueue.then(async () => {
    if (favoriteSyncMode.value === 'loading') {
      await hydrateFavoriteToolPaths();
      favoriteToolPaths.value = currentFavoriteToolPaths;
    }

    if (favoriteSyncMode.value !== 'remote') {
      writeCachedFavoriteToolPaths(currentFavoriteToolPaths);
      return;
    }

    try {
      const saved = await saveFavoriteToolPaths(currentFavoriteToolPaths);

      if (!saved) {
        favoriteSyncMode.value = 'local';
      }
    }
    catch {
      favoriteSyncMode.value = 'local';
    }

    writeCachedFavoriteToolPaths(currentFavoriteToolPaths);
  });

  return favoritePersistenceQueue;
}

async function hydrateFavoriteToolPaths() {
  if (favoriteHydrationPromise) {
    return favoriteHydrationPromise;
  }

  favoriteHydrationPromise = (async () => {
    const cachedFavoriteToolPaths = readCachedFavoriteToolPaths();

    try {
      const remoteFavoriteToolPaths = await fetchFavoriteToolPaths();

      if (remoteFavoriteToolPaths === null) {
        favoriteToolPaths.value = cachedFavoriteToolPaths;
        favoriteSyncMode.value = 'local';
        return;
      }

      if (remoteFavoriteToolPaths.length === 0 && cachedFavoriteToolPaths.length > 0) {
        favoriteToolPaths.value = cachedFavoriteToolPaths;
        favoriteSyncMode.value = 'remote';
        await saveFavoriteToolPaths(cachedFavoriteToolPaths);
        writeCachedFavoriteToolPaths(cachedFavoriteToolPaths);
        return;
      }

      favoriteToolPaths.value = remoteFavoriteToolPaths;
      favoriteSyncMode.value = 'remote';
      writeCachedFavoriteToolPaths(remoteFavoriteToolPaths);
    }
    catch {
      favoriteToolPaths.value = cachedFavoriteToolPaths;
      favoriteSyncMode.value = 'local';
    }
  })();

  return favoriteHydrationPromise;
}

export const useToolStore = defineStore('tools', () => {
  const { t } = useI18n();

  void hydrateFavoriteToolPaths();

  const tools = computed<ToolWithCategory[]>(() => toolsWithCategory.map((tool) => {
    const toolI18nKey = tool.path.replace(/\//g, '');

    return ({
      ...tool,
      path: tool.path,
      name: t(`tools.${toolI18nKey}.title`, tool.name),
      description: t(`tools.${toolI18nKey}.description`, tool.description),
      category: t(`tools.categories.${tool.category.toLowerCase()}`, tool.category),
    });
  }));

  const toolsByCategory = computed<ToolCategory[]>(() => {
    return _.chain(tools.value)
      .groupBy('category')
      .map((components, name, path) => ({
        name,
        path,
        components,
      }))
      .value();
  });

  const favoriteTools = computed(() => {
    return favoriteToolPaths.value
      .map(favoriteName => tools.value.find(({ path }) => path === favoriteName))
      .filter(Boolean) as ToolWithCategory[]; // cast because .filter(Boolean) does not remove undefined from type
  });

  return {
    tools,
    favoriteTools,
    toolsByCategory,
    newTools: computed(() => tools.value.filter(({ isNew }) => isNew)),

    async addToolToFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      const toolPath = get(tool).path;

      if (toolPath) {
        favoriteToolPaths.value = normalizeFavoriteToolPaths([...favoriteToolPaths.value, toolPath]);
        await queueFavoritePersistence();
      }
    },

    async removeToolFromFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      favoriteToolPaths.value = favoriteToolPaths.value.filter(name => name !== get(tool).path);
      await queueFavoritePersistence();
    },

    isToolFavorite({ tool }: { tool: MaybeRef<Tool> }) {
      return favoriteToolPaths.value.includes(get(tool).path);
    },

    async updateFavoriteTools(newOrder: ToolWithCategory[]) {
      favoriteToolPaths.value = normalizeFavoriteToolPaths(newOrder.map(tool => tool.path));
      await queueFavoritePersistence();
    },
  };
});
