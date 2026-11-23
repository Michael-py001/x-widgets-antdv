import { defineComponent } from 'vue'
import { Alert } from 'ant-design-vue'
import { XAlertProps } from './types/props'

export default defineComponent<XAlertProps>({
    name: 'XAlert',

    inheritAttrs: true,
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Alert {...attrs} {...props}>
                    {{ ...slots }}
                </Alert>
            )
        }
    },
})
