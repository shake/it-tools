<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { IconDotsVertical, IconInfoCircle, IconLogout, IconMoon, IconSun } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme, themeMode } = storeToRefs(styleStore);
const theme = useThemeVars();
const menuPanelBackground = computed(() => (themeMode.value === 'warm' ? '#fff7e5' : theme.bodyColor));

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function closeMenu() {
  isOpen.value = false;
}

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function setLightTheme() {
  styleStore.setTheme('light');
  closeMenu();
}

function setWarmTheme() {
  styleStore.setTheme('warm');
  closeMenu();
}

function setDarkTheme() {
  styleStore.setTheme('dark');
  closeMenu();
}

function logout() {
  window.location.assign(new URL('/logout', window.location.origin).toString());
}

onClickOutside(menuRef, closeMenu);
</script>

<template>
  <div ref="menuRef" class="navbar-more-menu" relative>
    <c-tooltip :tooltip="$t('home.nav.more')" position="bottom">
      <c-button
        circle
        variant="text"
        :aria-label="$t('home.nav.more')"
        @click="toggleMenu"
      >
        <n-icon size="22" :component="IconDotsVertical" />
      </c-button>
    </c-tooltip>

    <transition name="fade">
      <div v-if="isOpen" class="menu-panel">
        <div class="menu-title">
          {{ $t('home.nav.themeTitle') }}
        </div>

        <button class="menu-option" :class="{ active: themeMode === 'light' }" type="button" @click="setLightTheme">
          <n-icon size="20" :component="IconSun" />
          <span>{{ $t('home.nav.lightMode') }}</span>
        </button>

        <button class="menu-option" :class="{ active: themeMode === 'warm' }" type="button" @click="setWarmTheme">
          <n-icon size="20" :component="IconSun" />
          <span>{{ $t('home.nav.warmMode') }}</span>
        </button>

        <button class="menu-option" :class="{ active: isDarkTheme }" type="button" @click="setDarkTheme">
          <n-icon size="20" :component="IconMoon" />
          <span>{{ $t('home.nav.darkMode') }}</span>
        </button>

        <RouterLink class="menu-option about" to="/about" @click="closeMenu">
          <n-icon size="20" :component="IconInfoCircle" />
          <span>{{ $t('home.nav.aboutLabel') }}</span>
        </RouterLink>

        <div class="divider" />

        <button class="menu-option logout" type="button" @click="logout">
          <n-icon size="20" :component="IconLogout" />
          <span>{{ $t('home.nav.logout') }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.navbar-more-menu {
  position: relative;
}

.menu-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 30;
  min-width: 205px;
  padding: 16px 10px 12px;
  border-radius: 26px;
  background: v-bind('menuPanelBackground');
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(127, 127, 127, 0.14);
}

.menu-title {
  color: rgba(127, 127, 127, 0.95);
  font-size: 16px;
  font-weight: 600;
  padding: 0 12px 8px;
}

.menu-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: inherit;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  padding: 12px 12px;
  cursor: pointer;

  &:hover,
  &.active {
    background: rgba(192, 138, 39, 0.18);
  }
}

.about {
  text-decoration: none;
}

.logout {
  color: #d9480f;
}

.divider {
  height: 1px;
  margin: 8px 8px 6px;
  background: rgba(127, 127, 127, 0.18);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
