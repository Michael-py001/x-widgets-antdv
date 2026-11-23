import RangePicker from './BasicRangePicker'
import type { App } from 'vue'

export default Object.assign(RangePicker, {
    install: (app: App) => {
        app.component(RangePicker.name, RangePicker)
    },
})
