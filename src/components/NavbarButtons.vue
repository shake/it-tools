<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconInfoCircle } from '@tabler/icons-vue';
</script>

<template>
  <div class="navbar-buttons">
    <c-tooltip :tooltip="$t('home.nav.github')" position="bottom">
      <c-button
        circle
        size="small"
        variant="text"
        href="https://github.com/CorentinTh/it-tools"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('home.nav.githubRepository')"
      >
        <n-icon size="22" :component="IconBrandGithub" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="$t('home.nav.twitterX')" position="bottom">
      <c-button
        circle
        size="small"
        variant="text"
        href="https://x.com/ittoolsdottech"
        rel="noopener"
        target="_blank"
        :aria-label="$t('home.nav.twitterXAccount')"
      >
        <n-icon size="22" :component="IconBrandX" />
      </c-button>
    </c-tooltip>

    <c-tooltip :tooltip="$t('home.nav.about')" position="bottom">
      <c-button circle size="small" variant="text" to="/about" :aria-label="$t('home.nav.aboutLabel')">
        <n-icon size="22" :component="IconInfoCircle" />
      </c-button>
    </c-tooltip>
  </div>
</template>

<style lang="less" scoped>
.navbar-buttons {
  display: flex;
  align-items: center;
}
</style>
