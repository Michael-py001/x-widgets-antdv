import Segmented from './BasicSegmented'
import type { App } from 'vue'

export default Object.assign(Segmented, {
    install: (app: App) => {
        app.component(Segmented.name, Segmented)
    },
})
