import Watermark from './BasicWatermark'
import type { App } from 'vue'

export default Object.assign(Watermark, {
    install: (app: App) => {
        app.component(Watermark.name, Watermark)
    },
})
