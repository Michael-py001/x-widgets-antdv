import Transfer from './BasicTransfer'
import type { App } from 'vue'

export default Object.assign(Transfer, {
    install: (app: App) => {
        app.component(Transfer.name, Transfer)
    },
})
