import Row from './BasicRow'
import type { App } from 'vue'

export default Object.assign(Row, {
    install: (app: App) => {
        app.component(Row.name, Row)
    },
})
