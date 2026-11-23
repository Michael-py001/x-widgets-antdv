import Timeline from './BasicTimeline'
import type { App } from 'vue'

export default Object.assign(Timeline, {
    install: (app: App) => {
        app.component(Timeline.name, Timeline)
    },
})
