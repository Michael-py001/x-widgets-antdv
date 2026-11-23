import RadioGroup from './BasicRadioGroup'
import type { App } from 'vue'

export default Object.assign(RadioGroup, {
    install: (app: App) => {
        app.component(RadioGroup.name, RadioGroup)
    },
})
