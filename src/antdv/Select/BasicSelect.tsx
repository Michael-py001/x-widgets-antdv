import { defineComponent, ref } from 'vue'
import { Select, Col } from 'ant-design-vue'
import { XSelectProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { getUID, findObjectById } from '../../utils/widgetHelpers'
import { CloseOutlined } from '@ant-design/icons-vue'
import style from './style/index.module.less'
import { setFormdata, getValue } from '../../utils/handleFormData'

const NativeSelect = Select as any

interface Item {
    label?: string
    value?: string | number
    canDelete?: boolean
    children?: Item[]
    options?: Item[]
}

export default defineComponent<XSelectProps>({
    name: 'XSelect',
    props: {
        ...basicFormProps(),
        ...Select.props,
    },
    emits: ['validateName'],
    setup(props, { attrs, slots, emit }) {
        const { event, label, placeholder, formData, name, mode, maxTagCount, maxTagTextLength } =
            props
        const { onSearch, onBlur, onFocus, onInputKeyDown, onChange, onSelect } = event
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        const _event = event || {}
        let _slots = slots
        const _input_cache = ref(null)
        const UID = getUID()
        function getNode(): HTMLElement {
            return document.querySelector(`#${UID}`)
        }

        function handleDelete(item: object, e: MouseEvent) {
            e.stopPropagation()
            e.preventDefault()
            const { onDelete } = event || {}
            onDelete && onDelete(item)
        }

        function setInputStyle(type) {
            const node = getNode() as HTMLInputElement
            if (!node) return
            const nextNode = node.parentNode.nextSibling as HTMLElement
            if (nextNode && nextNode.style) {
                nextNode.style.display = type
            }
        }
        return () => {
            const { options } = props || {}
            function isExist(label) {
                if (options && options.length > 0) {
                    return options.some(item => {
                        return item.label === label
                    })
                }
                return false
            }
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: string) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请选择${label}` : placeholder),
                }
                basicProps['id'] = UID
                if (mode === 'single') {
                    function setData() {
                        if (_input_cache.value || _input_cache.value === '') {
                            _input_cache.value = _input_cache.value.replace(/\s*/g, '')
                        }
                        setTimeout(() => {
                            formData[name] = _input_cache.value
                            onChange && onChange(_input_cache.value)
                            _input_cache.value = null
                            emit('validateName', name)
                        })
                    }
                    _event['onSearch'] = (value: string) => {
                        if (value) {
                            _input_cache.value = value
                        }
                        onSearch && onSearch(value)
                    }
                    _event['onInput'] = (event: InputEvent) => {
                        const target = event.target as HTMLInputElement
                        _input_cache.value = target.value
                    }
                    _event['onBlur'] = e => {
                        if (_input_cache.value || _input_cache.value === '') {
                            setData()
                        }
                        setInputStyle('block')
                        onBlur && onBlur(e)
                    }
                    _event['onFocus'] = e => {
                        const node = getNode() as HTMLInputElement
                        const result = findObjectById(formData[name], options)
                        setInputStyle('none')
                        if (node) {
                            if (result) {
                                node.value = result?.label !== undefined ? result?.label : ''
                            } else {
                                node.value = formData[name] !== undefined ? formData[name] : ''
                            }
                        }
                        onFocus && onFocus(e)
                    }
                    _event['onSelect'] = (value: string) => {
                        const node = getNode() as HTMLInputElement
                        if (node) {
                            node.blur()
                        }
                        _input_cache.value = null
                        onSelect && onSelect(value)
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
                    basicProps['showSearch'] = true
                    basicProps['mode'] = 'combobox'
                } else if (mode === 'multiple-enhance') {
                    function setData() {
                        if (_input_cache.value) {
                            _input_cache.value = _input_cache.value.replace(/\s*/g, '')
                        }
                        if (maxTagTextLength && _input_cache.value.length > maxTagTextLength) {
                            _input_cache.value = _input_cache.value.slice(0, maxTagTextLength)
                        }
                        formData[name] = [...new Set([...formData[name], _input_cache.value])]
                        if (maxTagCount && formData[name].length > maxTagCount) {
                            formData[name].pop()
                        }
                        _input_cache.value = null
                        onChange && onChange(formData[name])
                        emit('validateName', name)
                    }
                    _event['onChange'] = (value: string) => {
                        //根据maxTagCount限制可选数量
                        if (maxTagCount && formData[name].length > maxTagCount) {
                            formData[name].pop()
                        }
                        onChange && onChange(value)
                    }
                    _event['onSearch'] = (value: string) => {
                        _input_cache.value = value
                        onSearch && onSearch(value)
                    }
                    _event['onBlur'] = e => {
                        if (_input_cache.value) {
                            if (!isExist(_input_cache.value)) {
                                setData()
                            }
                        }
                        onBlur && onBlur(e)
                    }
                    _event['onSelect'] = (value: string) => {
                        _input_cache.value = null
                        onSelect && onSelect(value)
                    }
                    _event['onInputKeyDown'] = e => {
                        if (e.key === 'Enter') {
                            if (_input_cache.value) {
                                if (!isExist(_input_cache.value)) {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setData()
                                    const node = getNode()
                                    node?.blur()
                                    setTimeout(() => {
                                        node.focus()
                                    }, 100)
                                }
                            }
                        }
                        onInputKeyDown && onInputKeyDown(e)
                    }
                    basicProps['mode'] = 'multiple'
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
            }
            return (
                <NativeSelect {...attrs} {...props} {...basicProps} {..._event}>
                    {{ ..._slots }}
                </NativeSelect>
            )
        }
    },
})
