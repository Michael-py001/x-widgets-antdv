import CheckboxGroup from './BasicCheckboxGroup'
import type { App } from 'vue'

export default Object.assign(CheckboxGroup, {
    install: (app: App) => {
        app.component(CheckboxGroup.name, CheckboxGroup)
    },
})
