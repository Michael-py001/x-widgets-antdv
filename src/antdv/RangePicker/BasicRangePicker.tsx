import { defineComponent } from 'vue'
import { RangePicker } from 'ant-design-vue'
import { XRangePickerProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'
import datePickerZhCN from '../DatePicker/locale/zhCN'

const NativeRangePicker = RangePicker as any

export default defineComponent({
    name: 'XRangePicker',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...RangePicker.props,
        ...basicFormProps(),
    },
    setup(props: XRangePickerProps, { attrs, slots }) {
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
            const { presets, ...resetProps } = props

            // 默认样式，如根据日期格式设置宽度
            let defaultStyles = {}

            if (resetProps.format === 'YYYY-MM-DD' || resetProps.valueFormat === 'YYYY-MM-DD') {
                defaultStyles = {
                    width: '222px',
                }
            }

            if (
                resetProps.format === 'YYYYMM' ||
                resetProps.valueFormat === 'YYYYMM' ||
                resetProps.format === 'YYYY-MM' ||
                resetProps.valueFormat === 'YYYY-MM'
            ) {
                defaultStyles = {
                    width: '182px',
                }
            }

            return (
                <NativeRangePicker
                    style={defaultStyles}
                    {...attrs}
                    {...resetProps}
                    {...basicProps}
                    {...event}
                    locale={datePickerZhCN}
                    presets={presets}
                >
                    {{ ...slots }}
                </NativeRangePicker>
            )
        }
    },
})
