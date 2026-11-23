import PageHeader from './BasicPageHeader'
import type { App } from 'vue'

export default Object.assign(PageHeader, {
    install: (app: App) => {
        app.component(PageHeader.name, PageHeader)
    },
})
