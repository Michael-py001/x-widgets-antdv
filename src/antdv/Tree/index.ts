import Tree from './BasicTree'
import type { App } from 'vue'

export default Object.assign(Tree, {
    install: (app: App) => {
        app.component(Tree.name, Tree)
    },
})
