import { defineComponent } from 'vue'
import { Textarea } from 'ant-design-vue'
import { XTextareaProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XTextareaProps>({
    name: 'XTextarea',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Textarea.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
        const { label, placeholder, formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请输入${label}` : placeholder),
                }
            }
            return (
                <Textarea {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Textarea>
            )
        }
    },
})
