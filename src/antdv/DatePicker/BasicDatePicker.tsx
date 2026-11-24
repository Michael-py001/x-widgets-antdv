import { defineComponent, isRef, unref } from 'vue'
import { DatePicker } from 'ant-design-vue'
import { basicFormProps, BasicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'
import './styles/reset.less'
import datePickerZhCN from './locale/zhCN'

export default defineComponent({
    name: 'XDatePicker',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...basicFormProps(),
    },
    setup(props: any, { attrs, slots }) {
        const {
            label,
            placeholder,
            formData,
            name,
            event,
            props: selfProps,
        } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps: BasicFormProps = {}

        return () => {
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder:
                        unref(placeholder) || (label ? `请选择${label}` : unref(placeholder)),
                }
            }

            if (isRef(props.disabledDate)) {
                basicProps.disabledDate = props.disabledDate.value
            }

            // 默认样式，如根据日期格式设置宽度
            let defaultStyles = {}

            if (selfProps.format === 'YYYY-MM-DD' || selfProps.format === 'YYYY-MM') {
                defaultStyles = {
                    width: '120px',
                }
            }

            return (
                <DatePicker
                    style={defaultStyles}
                    {...attrs}
                    {...props}
                    {...basicProps}
                    {...event}
                    locale={datePickerZhCN}
                >
                    {{ ...slots }}
                </DatePicker>
            )
        }
    },
})
