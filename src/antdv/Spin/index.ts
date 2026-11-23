import Spin from './BasicSpin'
import type { App } from 'vue'

export default Object.assign(Spin, {
    install: (app: App) => {
        app.component(Spin.name, Spin)
    },
})
