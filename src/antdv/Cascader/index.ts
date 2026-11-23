import Cascader from './BasicCascader'
import type { App } from 'vue'

export default Object.assign(Cascader, {
    install: (app: App) => {
        app.component(Cascader.name, Cascader)
    },
})
