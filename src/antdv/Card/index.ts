import Card from './BasicCard'
import type { App } from 'vue'

export default Object.assign(Card, {
    install: (app: App) => {
        app.component(Card.name, Card)
    },
})
