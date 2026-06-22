export function normalizeFavoriteToolPaths(paths: readonly string[]): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const path of paths) {
    const value = path.trim();

    if (!value || seen.has(value)) {
      continue;
    }

    seen.add(value);
    normalized.push(value);
  }

  return normalized;
}
