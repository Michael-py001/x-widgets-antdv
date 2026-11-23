import { defineComponent } from 'vue'
import { List } from 'ant-design-vue'

export default defineComponent({
    name: 'XList',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <List {...attrs} {...props}>
                    {{ ...slots }}
                </List>
            )
        }
    },
})
