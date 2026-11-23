import Checkbox from './BasicCheckbox'
import type { App } from 'vue'

export default Object.assign(Checkbox, {
    install: (app: App) => {
        app.component(Checkbox.name, Checkbox)
    },
})
