import { defineComponent, defineAsyncComponent } from 'vue'
import { XWatermarkProps } from './types/props'
let Component = null
const Watermark = defineAsyncComponent(() => import('ant-design-vue/es/watermark'))

if (Watermark) {
    Component = defineComponent<XWatermarkProps>({
        name: 'XWatermark',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <Watermark {...attrs} {...props}>
                        {{ ...slots }}
                    </Watermark>
                )
            }
        },
    })
}

export default Component
