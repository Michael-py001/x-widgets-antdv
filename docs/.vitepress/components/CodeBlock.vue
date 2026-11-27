<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { codeToHtml } from 'shiki'

/** 示例源码折叠展示：与 antdv.com 的「显示代码」一致，默认收起；用 Shiki 做语法高亮。 */
const props = defineProps<{ code: string }>()

/**
 * 示例源码里用于「显示代码」自身的 import、样式导入和 <style scoped> 段不属于示例逻辑，
 * 展示时去掉，让读者只看到可直接参考的 schema 与模板。
 */
function stripDemoBoilerplate(code: string): string {
  return code
    .split('\n')
    .filter(line => {
      const t = line.trim()
      if (/^import\s+CodeBlock\s+from\s+['"].*CodeBlock\.vue['"]\s*$/.test(t)) return false
      if (/^import\s+demoSource\s+from\s+['"].*\?raw['"]\s*$/.test(t)) return false
      if (/^import\s+['"].*\.css['"]\s*$/.test(t)) return false
      if (/^\s*<CodeBlock\b/.test(line)) return false
      return true
    })
    .join('\n')
    .replace(/<style[^>]*scoped[^>]*>[\s\S]*?<\/style>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const displayCode = computed(() => stripDemoBoilerplate(props.code))
const html = ref('')
async function highlight(code: string) {
  html.value = await codeToHtml(code, {
    lang: 'vue',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
onMounted(() => highlight(displayCode.value))
watch(displayCode, highlight)
</script>

<template>
  <details class="code-block">
    <summary class="code-block__toggle">显示代码</summary>
    <!-- vp-code 让 VitePress 现有的明暗色规则（--shiki-light / --shiki-dark）生效。 -->
    <div v-if="html" class="vp-code code-block__pre" v-html="html" />
    <pre v-else class="code-block__pre"><code>{{ displayCode }}</code></pre>
  </details>
</template>

<style scoped>
.code-block { margin-top: 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; }
.code-block__toggle { cursor: pointer; list-style: none; padding: 8px 14px; font-size: 12px; color: var(--vp-c-brand-1); background: var(--vp-c-bg); user-select: none; }
.code-block__toggle::-webkit-details-marker { display: none; }
.code-block__toggle::before { content: '▸ '; }
.code-block[open] .code-block__toggle::before { content: '▾ '; }
.code-block__pre { margin: 0; padding: 14px; max-height: 420px; overflow: auto; background: var(--vp-c-bg); border-top: 1px solid var(--vp-c-divider); }
.code-block__pre :deep(code),
.code-block__pre :deep(pre) { font-family: var(--vp-font-family-mono); font-size: 11.5px; line-height: 1.55; color: var(--vp-c-text-1); white-space: pre; }
.code-block__pre :deep(.shiki) { background: transparent !important; }
</style>
