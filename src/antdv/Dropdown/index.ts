import Dropdown from './BasicDropdown'
import type { App } from 'vue'

export default Object.assign(Dropdown, {
    install: (app: App) => {
        app.component(Dropdown.name, Dropdown)
    },
})
