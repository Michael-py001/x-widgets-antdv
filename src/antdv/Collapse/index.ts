import Collapse from './BasicCollapse'
import type { App } from 'vue'

export default Object.assign(Collapse, {
    install: (app: App) => {
        app.component(Collapse.name, Collapse)
    },
})
