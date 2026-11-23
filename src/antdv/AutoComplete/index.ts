import AutoComplete from './BasicAutoComplete'
import type { App } from 'vue'

export default Object.assign(AutoComplete, {
    install: (app: App) => {
        app.component(AutoComplete.name, AutoComplete)
    },
})
