import Layout from './BasicLayout'
import LayoutHeader from './BasicLayoutHeader'
import LayoutContent from './BasicLayoutContent'
import LayoutFooter from './BasicLayoutFooter'
import LayoutSider from './BasicLayoutSider'
import type { App } from 'vue'

export default Object.assign(Layout, {
    install: (app: App) => {
        app.component(Layout.name, Layout)
        app.component(LayoutHeader.name, LayoutHeader)
        app.component(LayoutContent.name, LayoutContent)
        app.component(LayoutFooter.name, LayoutFooter)
        app.component(LayoutSider.name, LayoutSider)
    },
})
