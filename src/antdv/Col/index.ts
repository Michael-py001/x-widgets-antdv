import Col from './BasicCol'
import type { App } from 'vue'

export default Object.assign(Col, {
    install: (app: App) => {
        app.component(Col.name, Col)
    },
})
