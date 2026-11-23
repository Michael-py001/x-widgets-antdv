import { defineComponent } from 'vue'
import { Mentions } from 'ant-design-vue'
import { XMentionsProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XMentionsProps>({
    name: 'XMentions',

    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Mentions.props,
        ...basicFormProps(),
    },
    setup(props: any, { attrs, slots }) {
        const { formData, name, event } = props
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
                }
            }
            return (
                <Mentions {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Mentions>
            )
        }
    },
})
