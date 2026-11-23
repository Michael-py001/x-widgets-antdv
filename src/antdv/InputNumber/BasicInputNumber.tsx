import { computed, defineComponent, ref, watch } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { XInputNumberProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { formatDecimal, parserDecimal } from '../../utils/widgetHelpers'
import { setFormdata, getValue } from '../../utils/handleFormData'
export default defineComponent({
    name: 'XInputNumber',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...InputNumber.props,
        ...basicFormProps(),
    },
    emits: ['update:value', 'change', 'blur', 'validateName'],
    setup(props: XInputNumberProps, { attrs, slots, emit }) {
        const {
            formatPrice,
            precision,
            label,
            placeholder,
            formData,
            name,
            event,
            formatPricePrefix,
            formatPriceSuffix,
            stringMode,
        } = props
        const { onBlur, onInput } = props
        const { onBlur: onBlur_formData, onInput: onInput_formData, ...restEvent } = event || {}
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}

        const formatPriceValue = ref(null)
        const formatPriceValueShow = computed(() => {
            if (formatPriceValue.value === null) return null
            return formatPriceValue.value
        })
        function formatPriceValueToFixed() {
            // 如果是stringMode，直接返回格式化后的值
            if (stringMode) {
                formatPriceValue.value = formatDecimal(parserDecimal(formatPriceValue.value))
                return formatPriceValue.value
            }
            if (precision !== null && precision !== undefined) {
                // 超过最大值时不进行toFixed
                if (Number(parserDecimal(formatPriceValue.value)) > Number.MAX_SAFE_INTEGER) {
                    formatPriceValue.value = formatDecimal(parserDecimal(formatPriceValue.value))
                } else {
                    formatPriceValue.value = formatDecimal(
                        Number(parserDecimal(formatPriceValue.value)).toFixed(precision),
                    )
                }
            } else {
                formatPriceValue.value = formatDecimal(
                    Number(parserDecimal(formatPriceValue.value)),
                )
            }

            return formatPriceValue.value
        }
        const isInputEnd = ref(true)
        const triggerBlur = (e: FocusEvent) => {
            isInputEnd.value = true
            onBlur && onBlur(e)
            onBlur_formData && onBlur_formData(e)
        }
        const triggerInput = (val: string) => {
            isInputEnd.value = false
            onInput && onInput(val)
            onInput_formData && onInput_formData(val)
            if (val === '' && _is_x_form_item && formData) {
                // const finalVal = toFixedTruncate(val, precision)
                // setFormdata(formData, name, finalVal)
                setFormdata(formData, name, val)
                emit('validateName', name)
            }
            emit('update:value', val?.replace(/(?!^-)[^\d.]/g, ''))
        }
        if (formatPrice) {
            watch(
                () => props.value,
                val => {
                    formatPriceValue.value = val
                },
                {
                    immediate: true,
                },
            )
        }
        if (_is_x_form_item && formData) {
            // const splitName = name.split(',')
            // if (splitName.length) {
            //     if (splitName.length === 2) {
            //         const [name1, name2] = splitName
            //         watch(
            //             () => formData[name1][name2],
            //             val => {
            //                 if (formatPrice) {
            //                     formatPriceValue.value = val
            //                 }
            //             },
            //             {
            //                 immediate: true,
            //                 deep: true,
            //             },
            //         )
            //     }
            // }
            if (Array.isArray(name)) {
                if (name.length === 2) {
                    const [name1, name2] = name
                    watch(
                        () => formData[name1][name2],
                        val => {
                            if (formatPrice) {
                                formatPriceValue.value = val
                            }
                        },
                        {
                            immediate: true,
                            deep: true,
                        },
                    )
                }
            } else {
                watch(
                    () => formData[name],
                    val => {
                        if (formatPrice) {
                            formatPriceValue.value = val
                        }
                    },
                    {
                        immediate: true,
                    },
                )
            }
        }
        return () => {
            if (_is_x_form_item && formData) {
                basicProps = Object.assign(basicProps, {
                    'onUpdate:value': (value: string) => {
                        // const finalVal = toFixedTruncate(value, precision)
                        // setFormdata(formData, name, finalVal)
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                    placeholder: placeholder || (label ? `请输入${label}` : placeholder),
                })
            }
            if (formatPrice) {
                // basicProps['precision'] = undefined
                if (formatPricePrefix || formatPriceSuffix) {
                    basicProps['formatter'] = (value: string) =>
                        `${formatPricePrefix}${value}${formatPriceSuffix}`
                }
                if (_is_x_form_item && formData) {
                    if (Array.isArray(name)) {
                        if (name.length === 2) {
                            const [name1, name2] = name
                            if (
                                isInputEnd.value &&
                                formData[name1][name2] !== undefined &&
                                formData[name1][name2] !== null &&
                                formData[name1][name2] !== ''
                            ) {
                                formatPriceValueToFixed()
                            }
                        }
                    } else {
                        if (
                            isInputEnd.value &&
                            formData[name] !== undefined &&
                            formData[name] !== null &&
                            formData[name] !== ''
                        ) {
                            formatPriceValueToFixed()
                        }
                    }
                } else {
                    if (
                        isInputEnd.value &&
                        props.value !== undefined &&
                        props.value !== null &&
                        props.value !== ''
                    ) {
                        formatPriceValueToFixed()
                    }
                }
            }
            if (formatPrice) {
                const { onBlur, onInput, ...restProps } = props
                // 使用formatPrice时，formatPriceValue用作显示格式化值
                return (
                    <InputNumber
                        {...attrs}
                        {...restProps}
                        {...basicProps}
                        {...restEvent}
                        value={formatPriceValueShow.value}
                        onBlur={triggerBlur}
                        onInput={triggerInput}
                    >
                        {{ ...slots }}
                    </InputNumber>
                )
            }
            const { onBlur, onInput, ...restProps } = props
            return (
                <InputNumber
                    {...attrs}
                    {...restProps}
                    value={props.value}
                    {...basicProps}
                    {...restEvent}
                    onBlur={triggerBlur}
                    onInput={triggerInput}
                >
                    {{ ...slots }}
                </InputNumber>
            )
        }
    },
})
