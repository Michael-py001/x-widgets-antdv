import Empty from './BasicEmpty'
import type { App } from 'vue'

export default Object.assign(Empty, {
    install: (app: App) => {
        app.component(Empty.name, Empty)
    },
})
