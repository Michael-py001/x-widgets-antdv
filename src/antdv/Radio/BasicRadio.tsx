import { defineComponent } from 'vue'
import { Radio } from 'ant-design-vue'

export default defineComponent({
    name: 'XRadio',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Radio {...attrs} {...props}>
                    {{ ...slots }}
                </Radio>
            )
        }
    },
})
