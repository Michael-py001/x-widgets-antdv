import Space from './BasicSpace'
import type { App } from 'vue'

export default Object.assign(Space, {
    install: (app: App) => {
        app.component(Space.name, Space)
    },
})
