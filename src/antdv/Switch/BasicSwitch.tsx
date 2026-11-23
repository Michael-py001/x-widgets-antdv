import { defineComponent } from 'vue'
import { Switch } from 'ant-design-vue'
import { XSwitchProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'
export default defineComponent<XSwitchProps>({
    name: 'XSwitch',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Switch.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
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
                <Switch {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Switch>
            )
        }
    },
})
