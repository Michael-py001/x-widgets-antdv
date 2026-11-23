import { defineComponent } from 'vue'
import { RadioButton } from 'ant-design-vue'

export default defineComponent({
    name: 'XRadioButton',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <RadioButton {...attrs} {...props}>
                    {{ ...slots }}
                </RadioButton>
            )
        }
    },
})
