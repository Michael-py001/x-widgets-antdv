import FloatButton from './BasicFloatButton'
import type { App } from 'vue'

export default Object.assign(FloatButton, {
    install: (app: App) => {
        app.component(FloatButton.name, FloatButton)
    },
})
