import { defineComponent } from 'vue'
import { Calendar } from 'ant-design-vue'

export default defineComponent({
    name: 'XCalendar',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Calendar {...attrs} {...props}>
                    {{ ...slots }}
                </Calendar>
            )
        }
    },
})
