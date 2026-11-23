import Tooltip from './BasicTooltip'
import type { App } from 'vue'

export default Object.assign(Tooltip, {
    install: (app: App) => {
        app.component(Tooltip.name, Tooltip)
    },
})
