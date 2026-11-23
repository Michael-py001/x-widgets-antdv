import Drawer from './BasicDrawer'
import type { App } from 'vue'

export default Object.assign(Drawer, {
    install: (app: App) => {
        app.component(Drawer.name, Drawer)
    },
})
