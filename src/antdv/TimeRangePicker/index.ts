import TimeRangePicker from './BasicTimeRangePicker'
import type { App } from 'vue'

export default Object.assign(TimeRangePicker, {
    install: (app: App) => {
        app.component(TimeRangePicker.name, TimeRangePicker)
    },
})
