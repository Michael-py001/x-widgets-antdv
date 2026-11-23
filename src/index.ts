import type { App } from 'vue'
import * as components from './components'
export * from './components'
export * from './utils'

export const install = function (app: App) {
    Object.keys(components).forEach(key => {
        const component = components[key]
        if (component.install) {
            app.use(component)
        }
    })

    // 绑定到实例属性
    // app.config.globalProperties.$message = components.message;
    return app
}

export default {
    install,
}
