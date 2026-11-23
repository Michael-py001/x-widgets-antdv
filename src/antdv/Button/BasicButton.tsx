import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

const propsValue = {
    ...Button.props,
    hide: {
        type: Boolean,
        default: false,
    },
}

export default defineComponent({
    name: 'XButton',
    inheritAttrs: true,
    props: propsValue,
    setup(props: { hide: boolean }, { attrs, slots }) {
        return () => {
            if (props.hide) return null

            return (
                <Button {...attrs} {...props}>
                    {slots}
                </Button>
            )
        }
    },
})
