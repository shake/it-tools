import { useStyleStore } from '@/stores/style.store';

export { defineThemes };

function defineThemes<Theme>(themes: { light: Theme; dark: Theme; warm?: Theme }) {
  return {
    themes,
    useTheme() {
      const styleStore = useStyleStore();
      return computed(() => {
        if (styleStore.themeMode === 'dark') {
          return themes.dark;
        }

        if (styleStore.themeMode === 'warm' && themes.warm) {
          return themes.warm;
        }

        return themes.light;
      });
    },
  };
}
