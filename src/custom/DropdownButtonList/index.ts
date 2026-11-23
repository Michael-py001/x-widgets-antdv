import DropdownButtonList from './DropdownButtonList'
import type { App } from 'vue'

DropdownButtonList.install = (app: App) => {
    app.component(DropdownButtonList.name as string, DropdownButtonList)
}

export default DropdownButtonList
