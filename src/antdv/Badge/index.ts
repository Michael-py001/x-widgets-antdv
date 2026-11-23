import Badge from './BasicBadge'
import type { App } from 'vue'

export default Object.assign(Badge, {
    install: (app: App) => {
        app.component(Badge.name, Badge)
    },
})
