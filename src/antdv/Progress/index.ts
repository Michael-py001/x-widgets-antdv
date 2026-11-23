import Progress from './BasicProgress'
import type { App } from 'vue'

export default Object.assign(Progress, {
    install: (app: App) => {
        app.component(Progress.name, Progress)
    },
})
