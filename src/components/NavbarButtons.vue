<script setup lang="ts">
import { IconBrandGithub } from '@tabler/icons-vue';
</script>

<template>
  <div class="navbar-buttons">
    <c-tooltip :tooltip="$t('home.nav.github')" position="bottom">
      <c-button
        circle
        size="small"
        variant="text"
        href="https://github.com/shake/it-tools"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('home.nav.githubRepository')"
      >
        <n-icon size="20" :component="IconBrandGithub" />
      </c-button>
    </c-tooltip>
  </div>
</template>

<style lang="less" scoped>
.navbar-buttons {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
