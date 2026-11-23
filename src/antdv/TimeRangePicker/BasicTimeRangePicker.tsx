import { XTimePickerProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

import { defineComponent, defineAsyncComponent } from 'vue'
let Component = null
const TimeRangePicker = defineAsyncComponent(() => import('ant-design-vue/es/time-picker'))
const NativeTimeRangePicker = TimeRangePicker as any

if (TimeRangePicker) {
    Component = defineComponent<XTimePickerProps>({
        name: 'XTimeRangePicker',
        inheritAttrs: true, // TAG: Props Reactive
        props: {
            ...TimeRangePicker.props,
            ...basicFormProps(),
        },
        setup(props: XTimePickerProps, { attrs, slots }) {
            const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
            const { event, formData, name } = props
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
                    <NativeTimeRangePicker {...attrs} {...props} {...basicProps} {...event}>
                        {{ ...slots }}
                    </NativeTimeRangePicker>
                )
            }
        },
    })
}

export default Component
