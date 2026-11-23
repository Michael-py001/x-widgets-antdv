import { defineComponent } from 'vue'
import { Mentions } from 'ant-design-vue'

export default defineComponent({
    name: 'XMentions',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Mentions {...attrs} {...props}>
                    {{ ...slots }}
                </Mentions>
            )
        }
    },
})
