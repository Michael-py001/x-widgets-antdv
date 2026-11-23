import Upload from './BasicUpload'
import type { App } from 'vue'

export default Object.assign(Upload, {
    install: (app: App) => {
        app.component(Upload.name, Upload)
    },
})
