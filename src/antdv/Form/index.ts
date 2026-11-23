import Form from './BasicForm'
import FormItem from './BasicFormItem'
import FormItemRest from './BasicFormItemRest'
import type { App } from 'vue'

export { Form, FormItem, FormItemRest }

export default Object.assign(Form, {
    install: (app: App) => {
        app.component(Form.name, Form)
        app.component(FormItem.name, FormItem)
        app.component(FormItemRest.name, FormItemRest)
    },
})
