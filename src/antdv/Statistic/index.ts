import Statistic from './BasicStatistic'
import type { App } from 'vue'

export default Object.assign(Statistic, {
    install: (app: App) => {
        app.component(Statistic.name, Statistic)
    },
})
