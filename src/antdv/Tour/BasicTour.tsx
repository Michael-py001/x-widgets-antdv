import { defineComponent, defineAsyncComponent } from 'vue'
import { XTourProps } from './types/props'

let Component = null
const Tour = defineAsyncComponent(() => import('ant-design-vue/es/tour'))

if (Tour) {
    Component = defineComponent<XTourProps>({
        name: 'XTour',

        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <Tour {...attrs} {...props}>
                        {{ ...slots }}
                    </Tour>
                )
            }
        },
    })
}

export default Component
