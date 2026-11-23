import ConfigProvider from './BasicConfigProvider'
import type { App } from 'vue'

export default Object.assign(ConfigProvider, {
    install: (app: App) => {
        app.component(ConfigProvider.name, ConfigProvider)
    },
})
