import type { App } from 'vue'
import EditInput from './EditInput'

export { EditInput }

export default Object.assign(EditInput, {
    install: (app: App) => {
        app.component(EditInput.name, EditInput)
    },
})
