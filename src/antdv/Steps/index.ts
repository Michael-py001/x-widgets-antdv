import Steps from './BasicSteps'
import type { App } from 'vue'

export default Object.assign(Steps, {
    install: (app: App) => {
        app.component(Steps.name, Steps)
    },
})
