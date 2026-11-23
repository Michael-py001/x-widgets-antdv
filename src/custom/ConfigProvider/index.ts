import ConfigProvider from './ConfigProvider.vue'
import type { App } from 'vue'

ConfigProvider.install = (app: App) => {
    app.component(ConfigProvider.name as string, ConfigProvider)
}

export default ConfigProvider
