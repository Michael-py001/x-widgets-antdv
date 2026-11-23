import Popconfirm from './BasicPopconfirm'
import type { App } from 'vue'

export default Object.assign(Popconfirm, {
    install: (app: App) => {
        app.component(Popconfirm.name, Popconfirm)
    },
})
