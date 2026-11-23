import Tabs from './BasicTabs'
import TabPane from './BasicTabPane'
import type { App } from 'vue'

export { Tabs, TabPane }

export default Object.assign(Tabs, {
    install: (app: App) => {
        app.component(Tabs.name, Tabs)
        app.component(TabPane.name, TabPane)
    },
})
