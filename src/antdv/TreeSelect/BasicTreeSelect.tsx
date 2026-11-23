import { defineComponent } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { XTreeSelectProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent({
    name: 'XTreeSelect',
    props: {
        ...TreeSelect.props,
        ...basicFormProps(),
    },
    inheritAttrs: true, // TAG: Props Reactive
    setup(props: XTreeSelectProps, { attrs, slots }) {
        const { event, label, placeholder, formData, name } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请选择${label}` : placeholder),
                }
            }
            return (
                <TreeSelect {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </TreeSelect>
            )
        }
    },
})
