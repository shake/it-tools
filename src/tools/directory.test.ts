import { describe, expect, it } from 'vitest';
import { isToolDirectoryCategorySlug, toolDirectoryTabs } from './directory';

describe('tool directory tabs', () => {
  it('keeps the expected tab order', () => {
    expect(toolDirectoryTabs.map(tab => tab.slug)).toEqual([
      'all',
      'favorites',
      'crypto',
      'converter',
      'web',
      'images-videos',
      'development',
      'network',
      'math',
      'measurement',
      'text',
      'data',
    ]);
  });

  it('accepts only category slugs for category routes', () => {
    expect(isToolDirectoryCategorySlug('crypto')).toBe(true);
    expect(isToolDirectoryCategorySlug('favorites')).toBe(false);
    expect(isToolDirectoryCategorySlug('all')).toBe(false);
    expect(isToolDirectoryCategorySlug('not-real')).toBe(false);
  });
});
