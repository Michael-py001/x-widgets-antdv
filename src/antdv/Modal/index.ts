import Modal from './BasicModal'
import type { App } from 'vue'

export default Object.assign(Modal, {
    install: (app: App) => {
        app.component(Modal.name, Modal)
    },
})
