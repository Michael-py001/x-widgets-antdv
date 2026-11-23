import { defineComponent, defineAsyncComponent } from 'vue'
import { XSegmentedProps } from './types/props'

let Component = null
const Segmented = defineAsyncComponent(() => import('ant-design-vue/es/segmented'))

if (Segmented) {
    Component = defineComponent<XSegmentedProps>({
        name: 'XSegmented',

        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <Segmented {...attrs} {...props}>
                        {{ ...slots }}
                    </Segmented>
                )
            }
        },
    })
}

export default Component
