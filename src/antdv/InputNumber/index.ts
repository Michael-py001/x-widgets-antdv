import InputNumber from './BasicInputNumber'
import type { App } from 'vue'

export default Object.assign(InputNumber, {
    install: (app: App) => {
        app.component(InputNumber.name, InputNumber)
    },
})
