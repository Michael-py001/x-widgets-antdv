import { defineComponent } from 'vue'
import { Result } from 'ant-design-vue'
import { XResultProps } from './types/props'

export default defineComponent<XResultProps>({
    name: 'XResult',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Result {...attrs} {...props}>
                    {{ ...slots }}
                </Result>
            )
        }
    },
})
