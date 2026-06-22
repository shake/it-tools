<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <router-link :to="tool.path" class="decoration-none">
    <c-card
      class="tool-card h-full transition transition-duration-0.35s !border-2px !hover:border-primary"
      style="border-radius: 22px; box-shadow: 0 10px 24px rgba(62, 43, 18, 0.06); overflow: hidden;"
    >
      <div class="tool-card__header" flex items-center justify-between>
        <n-icon class="text-neutral-400 dark:text-neutral-600" size="36" :component="tool.icon" />

        <div flex items-center gap-8px>
          <div
            v-if="tool.isNew"
            class="rounded-full px-8px py-3px text-xs text-white dark:text-neutral-800"
            :style="{
              'background-color': theme.primaryColor,
            }"
          >
            {{ $t('toolCard.new') }}
          </div>

          <FavoriteButton :tool="tool" />
        </div>
      </div>

      <div class="tool-card__title text-base font-medium text-black dark:text-white">
        {{ tool.name }}
      </div>
    </c-card>
  </router-link>
</template>

<style scoped>
.tool-card {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 251, 243, 0.94) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  min-height: 140px;
  padding: 14px 16px 12px;
}

.tool-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 34px rgba(62, 43, 18, 0.12);
}

.tool-card__header {
  min-height: 30px;
}

.tool-card__title {
  font-size: 15px;
  line-height: 1.25;
}
</style>
