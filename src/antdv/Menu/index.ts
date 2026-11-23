import Menu from './BasicMenu'
import MenuItem from './BasicMenuItem'
import type { App, Plugin } from 'vue'

Menu.Item = MenuItem

Menu.install = (app: App) => {
    app.component(Menu.name, Menu)
    app.component(MenuItem.name, MenuItem)
    return app
}
export { Menu, MenuItem }

export default Menu as typeof Menu &
    Plugin & {
        readonly Item: typeof MenuItem
    }
