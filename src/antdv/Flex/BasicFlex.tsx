import { defineComponent, defineAsyncComponent } from 'vue'

let Component = null

const Flex = defineAsyncComponent(() => import('ant-design-vue/es/flex'))

if (Flex) {
    Component = defineComponent({
        name: 'XFlex',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <Flex {...attrs} {...props}>
                        {{ ...slots }}
                    </Flex>
                )
            }
        },
    })
}

export default Component
