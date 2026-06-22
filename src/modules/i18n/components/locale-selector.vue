<script setup lang="ts">
const { locale } = useI18n();

const localeOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];
</script>

<template>
  <c-select
    v-model:value="locale"
    :options="localeOptions"
    size="small"
    w-88px
  />
</template>
