<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { ConfigProvider } from 'x-widgets-antdv'
import { theme } from 'ant-design-vue'

/** 整站用 ConfigProvider 包裹：示例中的 Ant Design Vue 控件跟随 VitePress 明暗模式。 */
const { isDark } = useData()
const docsTheme = computed(() => ({ algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm }))
const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <ConfigProvider :theme="docsTheme">
    <component :is="DefaultLayout" />
  </ConfigProvider>
</template>
