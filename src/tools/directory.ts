export const toolDirectoryTabs = [
  {
    slug: 'all',
    labelKey: 'home.directory.all',
    path: '/',
  },
  {
    slug: 'favorites',
    labelKey: 'home.directory.favorites',
    path: '/favorites',
  },
  {
    slug: 'crypto',
    labelKey: 'tools.categories.crypto',
    path: '/category/crypto',
  },
  {
    slug: 'converter',
    labelKey: 'tools.categories.converter',
    path: '/category/converter',
  },
  {
    slug: 'web',
    labelKey: 'tools.categories.web',
    path: '/category/web',
  },
  {
    slug: 'images-videos',
    labelKey: 'tools.categories.images and videos',
    path: '/category/images-videos',
  },
  {
    slug: 'development',
    labelKey: 'tools.categories.development',
    path: '/category/development',
  },
  {
    slug: 'network',
    labelKey: 'tools.categories.network',
    path: '/category/network',
  },
  {
    slug: 'math',
    labelKey: 'tools.categories.math',
    path: '/category/math',
  },
  {
    slug: 'measurement',
    labelKey: 'tools.categories.measurement',
    path: '/category/measurement',
  },
  {
    slug: 'text',
    labelKey: 'tools.categories.text',
    path: '/category/text',
  },
  {
    slug: 'data',
    labelKey: 'tools.categories.data',
    path: '/category/data',
  },
] as const;

export type ToolDirectoryTab = typeof toolDirectoryTabs[number];
export type ToolDirectorySlug = ToolDirectoryTab['slug'];
export type ToolDirectoryCategorySlug = Exclude<ToolDirectorySlug, 'all' | 'favorites'>;

const toolDirectoryCategorySlugs = new Set<ToolDirectoryCategorySlug>(
  toolDirectoryTabs
    .filter((tab): tab is ToolDirectoryTab & { slug: ToolDirectoryCategorySlug } => tab.slug !== 'all' && tab.slug !== 'favorites')
    .map(tab => tab.slug),
);

export function isToolDirectoryCategorySlug(slug: string): slug is ToolDirectoryCategorySlug {
  return toolDirectoryCategorySlugs.has(slug as ToolDirectoryCategorySlug);
}

