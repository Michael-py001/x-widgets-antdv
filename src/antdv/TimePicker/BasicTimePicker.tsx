import { defineComponent } from 'vue'
import { TimePicker } from 'ant-design-vue'
import { XTimePickerProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

const NativeTimePicker = TimePicker as any

export default defineComponent<XTimePickerProps>({
    name: 'XTimePicker',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...TimePicker.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        const { event, label, placeholder, formData, name } = props

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
                <NativeTimePicker {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </NativeTimePicker>
            )
        }
    },
})
