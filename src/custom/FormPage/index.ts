import FormPage from './FormPage.vue'
import type { App, Plugin } from 'vue'

FormPage.install = (app: App) => {
    app.component(FormPage.name as string, FormPage)
}

export default FormPage as typeof FormPage & Plugin
