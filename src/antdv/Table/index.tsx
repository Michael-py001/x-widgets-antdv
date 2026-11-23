import Table from './BasicTable'
import type { App, Plugin } from 'vue'
import type { XTableProps as TableProps } from './types/props'

Table.install = (app: App) => {
    app.component(Table.name, Table)
}

export default Table as typeof Table &
    Plugin & {
        setEmptyImage: (image: string) => void
    }
export type { TableProps }
