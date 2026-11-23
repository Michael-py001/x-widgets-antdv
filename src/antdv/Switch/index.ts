import Switch from './BasicSwitch'
import type { App } from 'vue'

export default Object.assign(Switch, {
    install: (app: App) => {
        app.component(Switch.name, Switch)
    },
})
