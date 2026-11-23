import { defineComponent } from 'vue'
import { AutoComplete as AntAutoComplete, Col } from 'ant-design-vue'
import { XAutoCompleteProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { CloseOutlined } from '@ant-design/icons-vue'
import style from './style/index.module.less'
import { setFormdata, getValue } from '../../utils/handleFormData'

const AutoComplete = AntAutoComplete as any

interface Item {
    label?: string
    value?: string | number
    children?: Item[]
    options?: Item[]
    canDelete?: boolean
}

export default defineComponent({
    name: 'XAutoComplete',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...AutoComplete.props,
        ...basicFormProps(),
    },
    setup(props: XAutoCompleteProps, { attrs, slots }) {
        // 用户绑定输入框的值到外部表单, formData为model对象
        const { formData, name, placeholder, label, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        let _slots = slots
        function handleDelete(item: object, e: MouseEvent) {
            e.stopPropagation()
            e.preventDefault()
            const { onDelete } = event || {}
            onDelete && onDelete(item)
        }
        return () => {
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请输入${label}` : placeholder),
                }
                _slots = {
                    option: (record: Item) => [
                        <Col span={24} class={style.flex}>
                            <span class={style.label}>{record.label}</span>
                            {record.canDelete && (
                                <CloseOutlined
                                    class={style.deleteIcon}
                                    onClick={(e: MouseEvent) => handleDelete(record, e)}
                                />
                            )}
                        </Col>,
                    ],
                    ...slots,
                }
            }
            return (
                <AutoComplete {...attrs} {...props} {...basicProps} {...event}>
                    {{ ..._slots }}
                </AutoComplete>
            )
        }
    },
})
