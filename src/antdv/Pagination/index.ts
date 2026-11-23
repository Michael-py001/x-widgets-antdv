import Pagination from './BasicPagination'
import type { App } from 'vue'

export default Object.assign(Pagination, {
    install: (app: App) => {
        app.component(Pagination.name, Pagination)
    },
})
