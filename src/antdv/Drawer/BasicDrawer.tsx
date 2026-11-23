import { defineComponent } from 'vue'
import { Drawer } from 'ant-design-vue'
import { XDrawerProps } from './types/props'

export default defineComponent<XDrawerProps>({
    name: 'XDrawer',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Drawer {...attrs} {...props}>
                    {{ ...slots }}
                </Drawer>
            )
        }
    },
})
