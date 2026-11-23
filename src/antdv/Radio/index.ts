import Radio from './BasicRadio'
import RadioButton from './BasicRadioButton'
import type { App } from 'vue'

export { Radio, RadioButton }

export default Object.assign(Radio, {
    install: (app: App) => {
        app.component(Radio.name, Radio)
        app.component(RadioButton.name, RadioButton)
    },
})
