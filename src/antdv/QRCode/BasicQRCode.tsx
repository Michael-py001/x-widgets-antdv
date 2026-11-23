import { defineComponent, defineAsyncComponent } from 'vue'
import { XQRCodeProps } from './types/props'
let Component = null
const QRCode = defineAsyncComponent(() => import('ant-design-vue/es/qrcode'))

if (QRCode) {
    Component = defineComponent<XQRCodeProps>({
        name: 'XQRCode',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <QRCode {...attrs} {...props}>
                        {{ ...slots }}
                    </QRCode>
                )
            }
        },
    })
}

export default Component
