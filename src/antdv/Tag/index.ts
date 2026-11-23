import Tag from './BasicTag'
import type { App } from 'vue'

export default Object.assign(Tag, {
    install: (app: App) => {
        app.component(Tag.name, Tag)
    },
})
