import DatePicker from './BasicDatePicker'
import type { App } from 'vue'

export default Object.assign(DatePicker, {
    install: (app: App) => {
        app.component(DatePicker.name, DatePicker)
    },
})
