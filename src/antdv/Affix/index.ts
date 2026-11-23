import Affix from './BasicAffix'
import type { App } from 'vue'

export default Object.assign(Affix, {
    install: (app: App) => {
        app.component(Affix.name, Affix)
    },
})
