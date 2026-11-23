import { defineComponent } from 'vue'
import { TabPane } from 'ant-design-vue'
import { XTabsProps } from './types/props'

const NativeTabPane = TabPane as any

export default defineComponent<XTabsProps>({
    name: 'XTabPane',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <NativeTabPane {...attrs} {...props}>
                    {{ ...slots }}
                </NativeTabPane>
            )
        }
    },
})
