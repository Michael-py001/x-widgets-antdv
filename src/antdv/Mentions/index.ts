import Mentions from './BasicMentions'
import type { App } from 'vue'

export default Object.assign(Mentions, {
    install: (app: App) => {
        app.component(Mentions.name, Mentions)
    },
})
