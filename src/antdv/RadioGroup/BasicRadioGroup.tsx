import { defineComponent, ref } from 'vue'
import { RadioGroup } from 'ant-design-vue'
import { XRadioGroupProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'
export default defineComponent<XRadioGroupProps>({
    name: 'XRadioGroup',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...RadioGroup.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots, expose }) {
        const { formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let isUpdate = ref(false)
        let basicProps = {}

        expose({
            isUpdate,
        })
        return () => {
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        isUpdate.value = true
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                }
            }
            return (
                <RadioGroup {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </RadioGroup>
            )
        }
    },
})
