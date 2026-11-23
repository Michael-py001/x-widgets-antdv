import Divider from './BasicDivider'
import type { App } from 'vue'

export default Object.assign(Divider, {
    install: (app: App) => {
        app.component(Divider.name, Divider)
    },
})
