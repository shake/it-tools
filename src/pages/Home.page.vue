<script setup lang="ts">
import { IconDragDrop, IconHeart } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useThemeVars } from 'naive-ui';
import Draggable from 'vuedraggable';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import { config } from '@/config';
import { toolDirectoryTabs, type ToolDirectorySlug } from '@/tools/directory';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();
const route = useRoute();
const themeVars = useThemeVars();
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);

const currentTabSlug = computed<ToolDirectorySlug>(() => {
  if (route.name === 'favorites') {
    return 'favorites';
  }

  if (route.name === 'category') {
    const slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;

    if (typeof slug === 'string' && toolDirectoryTabs.some(tab => tab.slug === slug)) {
      return slug as ToolDirectorySlug;
    }
  }

  return 'all';
});

const currentTab = computed(() => toolDirectoryTabs.find(tab => tab.slug === currentTabSlug.value) ?? toolDirectoryTabs[0]);
const currentTabLabel = computed(() => t(currentTab.value.labelKey));
const isAllTab = computed(() => currentTabSlug.value === 'all');
const isFavoritesTab = computed(() => currentTabSlug.value === 'favorites');

const categoryTools = computed(() => {
  if (isAllTab.value || isFavoritesTab.value) {
    return [];
  }

  return toolStore.toolsByCategory.find(({ name }) => name === currentTabLabel.value)?.components ?? [];
});

const pageTitle = computed(() => {
  if (isAllTab.value) {
    return 'IT Tools - Handy online tools for developers';
  }

  return `${currentTabLabel.value} - IT Tools`;
});

useHead(() => ({
  title: pageTitle.value,
}));

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="pt-50px">
    <div class="grid-wrapper">
      <div class="directory-tabs">
        <RouterLink
          v-for="tab in toolDirectoryTabs"
          :key="tab.slug"
          :to="tab.path"
          class="directory-tab"
          :class="{ active: currentTabSlug === tab.slug }"
        >
          {{ $t(tab.labelKey) }}
        </RouterLink>
      </div>

      <template v-if="isAllTab">
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ColoredCard v-if="config.showBanner" :title="$t('home.follow.title')" :icon="IconHeart">
            {{ $t('home.follow.p1') }}
            <a
              href="https://github.com/CorentinTh/it-tools"
              rel="noopener"
              target="_blank"
              :aria-label="$t('home.follow.githubRepository')"
            >GitHub</a>
            {{ $t('home.follow.p2') }}
            <a
              href="https://x.com/ittoolsdottech"
              rel="noopener"
              target="_blank"
              :aria-label="$t('home.follow.twitterXAccount')"
            >X</a>.
            {{ $t('home.follow.thankYou') }}
            <n-icon :component="IconHeart" />
          </ColoredCard>
        </div>

        <transition name="height">
          <div v-if="toolStore.favoriteTools.length > 0">
            <h3 class="section-title">
              {{ $t('home.categories.favoriteTools') }}
              <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
                <n-icon :component="IconDragDrop" size="18" />
              </c-tooltip>
            </h3>
            <Draggable
              :list="favoriteTools"
              class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
              ghost-class="ghost-favorites-draggable"
              item-key="name"
              @end="onUpdateFavoriteTools"
            >
              <template #item="{ element: tool }">
                <ToolCard :tool="tool" />
              </template>
            </Draggable>
          </div>
        </transition>

        <div v-if="toolStore.newTools.length > 0">
          <h3 class="section-title">
            {{ t('home.categories.newestTools') }}
          </h3>
          <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
            <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
          </div>
        </div>

        <h3 class="section-title">
          {{ $t('home.categories.allTools') }}
        </h3>
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
        </div>
      </template>

      <template v-else-if="isFavoritesTab">
        <h3 class="section-title">
          {{ $t('home.categories.favoriteTools') }}
          <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
            <n-icon :component="IconDragDrop" size="18" />
          </c-tooltip>
        </h3>

        <transition name="height">
          <div v-if="toolStore.favoriteTools.length > 0">
            <Draggable
              :list="favoriteTools"
              class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
              ghost-class="ghost-favorites-draggable"
              item-key="name"
              @end="onUpdateFavoriteTools"
            >
              <template #item="{ element: tool }">
                <ToolCard :tool="tool" />
              </template>
            </Draggable>
          </div>
          <div v-else class="empty-state">
            {{ $t('home.directory.emptyFavorites') }}
          </div>
        </transition>
      </template>

      <template v-else>
        <h3 class="section-title">
          {{ currentTabLabel }}
        </h3>
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in categoryTools" :key="tool.name" :tool="tool" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.directory-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
}

.directory-tab {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(127, 127, 127, 0.14);
  background: rgba(255, 255, 255, 0.55);
  color: #8d6b2d;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &.active {
    color: #fff;
    background: v-bind('themeVars.primaryColor');
    border-color: transparent;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 25px 0 5px;
  color: #9a9a9a;
  font-weight: 500;
}

.empty-state {
  padding: 24px 0 10px;
  color: #8f8f8f;
  font-size: 15px;
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: #ccc;
  border: 2px dashed #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.0);
  }
}
</style>
