import { describe, expect, it } from 'vitest';
import { normalizeFavoriteToolPaths } from '../../shared/favorites';

describe('normalizeFavoriteToolPaths', () => {
  it('removes blanks and duplicates while preserving order', () => {
    expect(normalizeFavoriteToolPaths([' /alpha ', '', '/beta', '/alpha', '   ', '/gamma'])).toEqual([
      '/alpha',
      '/beta',
      '/gamma',
    ]);
  });
});
