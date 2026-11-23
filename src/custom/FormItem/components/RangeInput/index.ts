import type { App } from 'vue'
import RangeInput from './RangeInput'

export { RangeInput }

export default Object.assign(RangeInput, {
    install: (app: App) => {
        app.component(RangeInput.name, RangeInput)
    },
})
