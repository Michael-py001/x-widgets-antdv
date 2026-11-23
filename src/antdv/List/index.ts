import List from './BasicList'
import type { App } from 'vue'

export default Object.assign(List, {
    install: (app: App) => {
        app.component(List.name, List)
    },
})
