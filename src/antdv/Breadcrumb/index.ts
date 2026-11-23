import Breadcrumb from './BasicBreadcrumb'
import BreadcrumbItem from './BasicBreadcrumbItem'
import type { App } from 'vue'

export default Object.assign(Breadcrumb, {
    install: (app: App) => {
        app.component(Breadcrumb.name, Breadcrumb)
        app.component(BreadcrumbItem.name, BreadcrumbItem)
    },
})

Breadcrumb.Item = BreadcrumbItem
// Breadcrumb.Separator = BreadcrumbSeparator;

export { BreadcrumbItem }
