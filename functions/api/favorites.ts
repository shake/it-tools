import { getAuthenticatedUserId, normalizeStoredFavoriteToolPaths } from '../_lib/favorites';
import type { D1Database } from '../_lib/d1';
import type { PluginData } from '@cloudflare/pages-plugin-cloudflare-access';

type Env = {
  DB: D1Database;
};

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    headers: {
      'cache-control': 'no-store',
    },
    ...init,
  });
}

async function readFavoriteToolPaths(env: Env, userId: string) {
  const result = await env.DB.prepare(
    'SELECT tool_path FROM favorites WHERE user_id = ? ORDER BY sort_order ASC',
  )
    .bind(userId)
    .all<{ tool_path: string }>();

  return result.results.map(row => row.tool_path);
}

async function saveFavoriteToolPaths(env: Env, userId: string, favoriteToolPaths: string[]) {
  const normalizedFavoriteToolPaths = normalizeStoredFavoriteToolPaths(favoriteToolPaths);
  const statements = [
    env.DB.prepare('DELETE FROM favorites WHERE user_id = ?').bind(userId),
    ...normalizedFavoriteToolPaths.map((toolPath, index) => env.DB.prepare(
      `INSERT INTO favorites (user_id, tool_path, sort_order)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, tool_path) DO UPDATE SET
         sort_order = excluded.sort_order,
         updated_at = CURRENT_TIMESTAMP`,
    ).bind(userId, toolPath, index)),
  ];

  await env.DB.batch(statements);

  return normalizedFavoriteToolPaths;
}

export async function onRequestGet({ request, env, data }: { request: Request; env: Env; data: PluginData }) {
  const userId = getAuthenticatedUserId(request, data);

  if (!userId) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const favoriteToolPaths = await readFavoriteToolPaths(env, userId);

  return json({ favoriteToolPaths });
}

export async function onRequestPut({ request, env, data }: { request: Request; env: Env; data: PluginData }) {
  const userId = getAuthenticatedUserId(request, data);

  if (!userId) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json().catch(() => null) as { favoriteToolPaths?: unknown } | null;
  const favoriteToolPaths = normalizeStoredFavoriteToolPaths(payload?.favoriteToolPaths);

  await saveFavoriteToolPaths(env, userId, favoriteToolPaths);

  return json({ favoriteToolPaths });
}
