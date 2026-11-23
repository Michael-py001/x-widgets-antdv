import Alert from './BasicAlert'
import type { App } from 'vue'

export default Object.assign(Alert, {
    install: (app: App) => {
        app.component(Alert.name, Alert)
    },
})
