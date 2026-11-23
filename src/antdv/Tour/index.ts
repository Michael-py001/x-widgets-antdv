import Tour from './BasicTour'
import type { App } from 'vue'

export default Object.assign(Tour, {
    install: (app: App) => {
        app.component(Tour.name, Tour)
    },
})
