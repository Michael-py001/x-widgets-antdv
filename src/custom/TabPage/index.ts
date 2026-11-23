import TabPage from './TabPage.vue'
import type { App } from 'vue'

TabPage.install = (app: App) => {
    app.component(TabPage.name as string, TabPage)
}

export default TabPage
