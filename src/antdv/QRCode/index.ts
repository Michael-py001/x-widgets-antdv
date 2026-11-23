import QRCode from './BasicQRCode'
import type { App } from 'vue'

export default Object.assign(QRCode, {
    install: (app: App) => {
        app.component(QRCode.name, QRCode)
    },
})
