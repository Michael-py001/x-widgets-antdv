import Button from './BasicButton'
import type { App } from 'vue'

export default Object.assign(Button, {
    install: (app: App) => {
        app.component(Button.name, Button)
    },
})
