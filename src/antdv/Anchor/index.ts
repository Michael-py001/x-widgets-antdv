import Anchor from './BasicAnchor'
import type { App } from 'vue'

export default Object.assign(Anchor, {
    install: (app: App) => {
        app.component(Anchor.name, Anchor)
    },
})
