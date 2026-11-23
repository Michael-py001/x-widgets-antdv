import Popover from './BasicPopover'
import type { App } from 'vue'

export default Object.assign(Popover, {
    install: (app: App) => {
        app.component(Popover.name, Popover)
    },
})
