import TreeSelect from './BasicTreeSelect'
import type { App } from 'vue'

export default Object.assign(TreeSelect, {
    install: (app: App) => {
        app.component(TreeSelect.name, TreeSelect)
    },
})
