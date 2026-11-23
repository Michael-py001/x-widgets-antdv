import { env } from 'node:process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'

const zhSearchTranslations = {
  button: {
    buttonText: '搜索文档',
    buttonAriaLabel: '搜索文档',
  },
  modal: {
    displayDetails: '显示更多结果',
    resetButtonTitle: '清除查询条件',
    backButtonTitle: '返回',
    noResultsText: '没有找到相关结果',
    footer: {
      selectText: '选择',
      selectKeyAriaLabel: '选择键',
      navigateText: '切换',
      navigateUpKeyAriaLabel: '向上',
      navigateDownKeyAriaLabel: '向下',
      closeText: '关闭',
      closeKeyAriaLabel: '关闭键',
    },
  },
}

export default defineConfig({
  title: 'X Widgets · Ant Design Vue',
  description: 'Reusable Vue 3 components built on Ant Design Vue 4.',
  cleanUrls: true,
  base: env.VITEPRESS_BASE || '/',
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        'x-widgets-antdv': resolve(dirname(fileURLToPath(import.meta.url)), '../../src'),
      },
    },
  },
  themeConfig: {
    search: { provider: 'local' },
    outline: { level: [2, 3] },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide' },
          { text: 'Components', link: '/components' },
          { text: 'AI usage', link: '/ai' },
        ],
        sidebar: {
          '/guide': [
            { text: 'Start here', items: [{ text: 'Installation & setup', link: '/guide' }] },
          ],
          '/components': [
            { text: 'Reference', items: [
              { text: 'Exported components', link: '/components' },
              { text: 'Controls', link: '/components/controls' },
              { text: 'Schema forms', link: '/components/forms' },
              { text: 'Table', link: '/components/table' },
              { text: 'Extended widgets', link: '/components/extended-widgets' },
              { text: 'Cross-library compatibility', link: '/components/compatibility' },
            ] },
          ],
          '/ai': [{ text: 'AI integration', items: [{ text: 'Agent guide', link: '/ai' }] }],
        },
      },
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'X Widgets · Ant Design Vue 中文文档',
      description: '基于 Ant Design Vue 构建的可复用 Vue 3 组件。',
      themeConfig: {
        search: { provider: 'local', options: { translations: zhSearchTranslations } },
        nav: [
          { text: '指南', link: '/zh-CN/guide' },
          { text: '组件', link: '/zh-CN/components/' },
          { text: 'AI 使用', link: '/zh-CN/ai' },
        ],
        sidebar: {
          '/zh-CN/guide': [
            { text: '从这里开始', items: [{ text: '安装与配置', link: '/zh-CN/guide' }] },
          ],
          '/zh-CN/components': [
            { text: '参考', items: [
              { text: '导出的组件', link: '/zh-CN/components/' },
              { text: '基础控件', link: '/zh-CN/components/controls' },
              { text: '表单 Schema', link: '/zh-CN/components/forms' },
              { text: '表格', link: '/zh-CN/components/table' },
              { text: '扩展组件', link: '/zh-CN/components/extended-widgets' },
              { text: '跨库兼容性', link: '/zh-CN/components/compatibility' },
            ] },
          ],
          '/zh-CN/ai': [{ text: 'AI 集成', items: [{ text: 'Agent 使用指南', link: '/zh-CN/ai' }] }],
        },
      },
    },
  },
})
