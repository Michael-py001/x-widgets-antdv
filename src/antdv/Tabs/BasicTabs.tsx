import { defineComponent } from 'vue'
import { Tabs } from 'ant-design-vue'
import { XTabsProps } from './types/props'

export default defineComponent<XTabsProps>({
    name: 'XTabs',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Tabs {...attrs} {...props}>
                    {{ ...slots }}
                </Tabs>
            )
        }
    },
})
