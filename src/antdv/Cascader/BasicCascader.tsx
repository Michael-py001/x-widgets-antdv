import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import { XCascaderProps } from './types/props'

export default defineComponent<XCascaderProps>({
    name: 'XCascader',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Cascader {...attrs} {...props}>
                    {{ ...slots }}
                </Cascader>
            )
        }
    },
})
