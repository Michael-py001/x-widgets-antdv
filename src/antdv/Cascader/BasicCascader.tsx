import { defineComponent } from 'vue'
import { Cascader } from 'ant-design-vue'
import { XCascaderProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XCascaderProps>({
    name: 'XCascader',

    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Cascader.props,
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
                    'onUpdate:value': (value: any) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请选择${label}` : placeholder),
                }
            }
            return (
                <Cascader {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Cascader>
            )
        }
    },
})
