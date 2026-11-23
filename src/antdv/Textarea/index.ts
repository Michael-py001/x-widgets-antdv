import Textarea from './BasicTextarea'
import type { App } from 'vue'

export default Object.assign(Textarea, {
    install: (app: App) => {
        app.component(Textarea.name, Textarea)
    },
})
