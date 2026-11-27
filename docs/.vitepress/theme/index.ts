import DefaultTheme from 'vitepress/theme'
import ControlDemo from '../components/ControlDemo.vue'
import AdvancedDemo from '../components/AdvancedDemo.vue'
import RealCaseDemo from '../components/RealCaseDemo.vue'
import ControlGallery from '../components/ControlGallery.vue'
import SlotDemo from '../components/SlotDemo.vue'
import ShowcaseGallery from '../components/ShowcaseGallery.vue'
import DocsConfig from '../components/DocsConfig.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  // 用 ConfigProvider 包裹整站，示例控件跟随 VitePress 明暗模式。
  Layout: DocsConfig,
  enhanceApp({ app }: Parameters<NonNullable<typeof DefaultTheme.enhanceApp>>[0]) {
    DefaultTheme.enhanceApp?.({ app } as Parameters<NonNullable<typeof DefaultTheme.enhanceApp>>[0])
    app.component('AntdvControlDemo', ControlDemo)
    app.component('AntdvAdvancedDemo', AdvancedDemo)
    app.component('AntdvRealCaseDemo', RealCaseDemo)
    app.component('AntdvControlGallery', ControlGallery)
    app.component('AntdvSlotDemo', SlotDemo)
    app.component('ShowcaseGallery', ShowcaseGallery)
  },
}
