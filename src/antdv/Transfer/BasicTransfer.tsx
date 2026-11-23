import { defineComponent } from 'vue'
import { Transfer } from 'ant-design-vue'
import { XTransferProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XTransferProps>({
    name: 'XTransfer',

    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Transfer.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
        const { formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            // Transfer 的值字段是 targetKeys，而非 value
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:targetKeys': (value: string[]) => {
                        setFormdata(formData, name, value)
                    },
                    targetKeys: getValue(formData, name),
                }
            }
            return (
                <Transfer {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Transfer>
            )
        }
    },
})
