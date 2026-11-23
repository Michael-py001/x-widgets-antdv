import { defineComponent } from 'vue'
import { Input } from 'ant-design-vue'
import { XInputProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import usePropsByCustomForm from './utils/usePropsByCustomForm'

export default defineComponent({
    name: 'XInput',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Input.props,
        ...basicFormProps(),
    },
    setup(props: XInputProps, { attrs, slots }) {
        // 用户绑定输入框的值到外部表单, formData为model对象
        const { event } = props
        // 经过custom/FormItem处理的标志
        const { _is_x_form_item } = attrs

        return () => {
            let customProps = {}

            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item) {
                customProps = usePropsByCustomForm(props)
            }

            return (
                <Input {...attrs} {...props} {...customProps} {...event}>
                    {{ ...slots }}
                </Input>
            )
        }
    },
})
