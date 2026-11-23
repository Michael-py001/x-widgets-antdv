import Comment from './BasicComment'
import type { App } from 'vue'

export default Object.assign(Comment, {
    install: (app: App) => {
        app.component(Comment.name, Comment)
    },
})
