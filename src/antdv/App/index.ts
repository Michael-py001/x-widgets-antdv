import _App from './BasicApp'
import type { App } from 'vue'

export default Object.assign(_App, {
    install: (app: App) => {
        app.component(_App.name, _App)
    },
})
