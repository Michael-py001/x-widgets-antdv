import Rate from './BasicRate'
import type { App } from 'vue'

export default Object.assign(Rate, {
    install: (app: App) => {
        app.component(Rate.name, Rate)
    },
})
