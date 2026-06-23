import { useMediaQuery, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, computed, watch } from 'vue';

export type ThemeMode = 'light' | 'warm' | 'dark';

export const useStyleStore = defineStore('style', {
  state: () => {
    const themeMode = useStorage<ThemeMode>('themeMode', 'light');
    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isMenuCollapsed = useStorage('isMenuCollapsed', isSmallScreen.value) as Ref<boolean>;

    if (typeof window !== 'undefined' && window.localStorage.getItem('themeMode') === null) {
      const legacyTheme = window.localStorage.getItem('vueuse-color-scheme');

      if (legacyTheme === 'dark' || legacyTheme === 'light') {
        themeMode.value = legacyTheme;
      }
      else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeMode.value = 'dark';
      }
    }

    watch(isSmallScreen, v => (isMenuCollapsed.value = v));
    watch(
      themeMode,
      (mode) => {
        if (typeof document === 'undefined') {
          return;
        }

        document.documentElement.classList.toggle('dark', mode === 'dark');
      },
      { immediate: true },
    );

    return {
      themeMode,
      isDarkTheme: computed(() => themeMode.value === 'dark'),
      isWarmTheme: computed(() => themeMode.value === 'warm'),
      isLightTheme: computed(() => themeMode.value === 'light'),
      setTheme(mode: ThemeMode) {
        themeMode.value = mode;
      },
      toggleDark() {
        themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark';
      },
      isMenuCollapsed,
      isSmallScreen,
    };
  },
});
