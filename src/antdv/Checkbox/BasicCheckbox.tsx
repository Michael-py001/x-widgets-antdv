import { defineComponent } from 'vue'
import { Checkbox } from 'ant-design-vue'
import { XCheckboxProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'
export default defineComponent({
    name: 'XCheckbox',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Checkbox.props,
        ...basicFormProps(),
    },
    setup(props: XCheckboxProps, { attrs, slots }) {
        const { formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:checked': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    checked: getValue(formData, name),
                }
            }
            return (
                <Checkbox {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Checkbox>
            )
        }
    },
})
