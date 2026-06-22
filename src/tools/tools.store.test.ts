import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

const fetchMock = vi.fn();

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (_key: string, fallback?: string) => fallback ?? _key,
  }),
}));

vi.mock('./index', () => ({
  toolsWithCategory: [
    {
      path: '/token-generator',
      name: 'Token 生成器',
      description: 'Generate tokens',
      category: 'General',
    },
  ],
}));

vi.stubGlobal('fetch', fetchMock);

describe('useToolStore favorites persistence', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
    fetchMock.mockReset();
  });

  it('persists a favorite to the remote store even if the user clicks before hydration finishes', async () => {
    let resolveFavoritesGet!: (response: Response) => void;

    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);

      if (init?.method === 'PUT') {
        return Promise.resolve(new Response('', { status: 204 }));
      }

      if (url.endsWith('/api/favorites')) {
        return new Promise<Response>((resolve) => {
          resolveFavoritesGet = resolve;
        });
      }

      return Promise.reject(new Error(`Unexpected fetch call: ${url}`));
    });

    const { useToolStore } = await import('./tools.store');
    const store = useToolStore();
    const favoriteTool = { path: '/token-generator' } as any;

    const addFavoritePromise = store.addToolToFavorites({ tool: favoriteTool });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('favoriteToolsName')).toBeNull();

    resolveFavoritesGet(new Response(JSON.stringify({ favoriteToolPaths: [] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }));

    await addFavoritePromise;

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenLastCalledWith('/api/favorites', expect.objectContaining({
      method: 'PUT',
    }));
    expect(window.localStorage.getItem('favoriteToolsName')).toBe(JSON.stringify(['/token-generator']));
  });
});
