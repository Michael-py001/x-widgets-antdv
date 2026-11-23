import Calendar from './BasicCalendar'
import type { App } from 'vue'

export default Object.assign(Calendar, {
    install: (app: App) => {
        app.component(Calendar.name, Calendar)
    },
})
