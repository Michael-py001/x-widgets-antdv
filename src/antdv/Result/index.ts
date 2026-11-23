import Result from './BasicResult'
import type { App } from 'vue'

export default Object.assign(Result, {
    install: (app: App) => {
        app.component(Result.name, Result)
    },
})
