import { defineComponent, unref } from 'vue'
import { XAnchorProps } from './types/props'
import { Anchor } from 'ant-design-vue'

export default defineComponent<XAnchorProps>({
    name: 'XAnchor',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XAnchorProps

        return () => {
            return <Anchor {...propsData}>{slots}</Anchor>
        }
    },
})
