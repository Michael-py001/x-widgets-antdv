import GoBack from './GoBack.vue'
import type { App } from 'vue'

GoBack.install = (app: App) => {
    app.component(GoBack.name as string, GoBack)
}

export default GoBack
