import { defineComponent, defineAsyncComponent } from 'vue'

let Component = null
const FloatButton = defineAsyncComponent(() => import('ant-design-vue/es/float-button'))

if (FloatButton) {
    Component = defineComponent({
        name: 'XFloatButton',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <FloatButton {...attrs} {...props}>
                        {{ ...slots }}
                    </FloatButton>
                )
            }
        },
    })
}

export default Component
