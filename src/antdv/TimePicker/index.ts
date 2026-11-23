import TimePicker from './BasicTimePicker'
import type { App } from 'vue'

export default Object.assign(TimePicker, {
    install: (app: App) => {
        app.component(TimePicker.name, TimePicker)
    },
})
