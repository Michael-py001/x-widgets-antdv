import { defineComponent, onMounted, ref, watch, defineAsyncComponent, Fragment } from 'vue'
import { basicFormProps } from './types/basicFormProps'
import type { XRangeInputProps } from './types/props'
import InputNumber from '../../../../antdv/InputNumber'
import style from './style/index.module.less'
// import { FormItemRest } from 'ant-design-vue'

/**
 * @description 输入区间组件
 * @author WuShiLi
 */

const FormItemRest =
    defineAsyncComponent(() => import('ant-design-vue/es/form/FormItemContext')) || Fragment

export default defineComponent({
    name: 'XRangeInput',
    props: {
        ...InputNumber.props,
        ...basicFormProps(),
    },
    emits: ['update:value', 'validateName', 'change', 'blur'],
    setup(props: XRangeInputProps, { attrs, emit }) {
        const { event, placeholder, formData, name, props: _props } = props
        const { onBlur, onChange, ...restEvent } = event
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        const inputValueArr = ref<string[] | number[]>([null, null])

        if (formData) {
            watch(
                () => formData[name],
                val => {
                    inputValueArr.value = val
                },
            )
        }
        const triggerBlur = (e: FocusEvent) => {
            emit('validateName', name)
            emit('blur', inputValueArr.value)
            onBlur && onBlur(inputValueArr.value)
        }

        const triggerChangeOne = (value: number | string) => {
            inputValueArr.value[0] = value
            triggerChange(inputValueArr.value)
        }

        const triggerChangeTow = (value: number | string) => {
            inputValueArr.value[1] = value
            triggerChange(inputValueArr.value)
        }

        const triggerChange = (value: number[] | string[]) => {
            if (_is_x_form_item && formData) {
                formData[name] = value
            } else {
                emit('update:value', value)
                emit('change', value)
            }
            onChange && onChange(value)
        }
        onMounted(() => {
            const nodes = document.querySelectorAll('.x-range-input_box .ant-input-number-input')
            if (!nodes) return
            nodes.forEach(node => {
                node.setAttribute('size', '12')
            })
        })
        const commonProps = {
            controls: false,
            min: props.min,
            max: props.max,
            precision: props.precision,
            step: props.step,
            formatter: props.formatter,
            parser: props.parser,
            disabled: props.disabled,
            readonly: props.readonly,
            size: props.size,
            prefix: props.prefix,
        }
        return () => {
            if (_is_x_form_item && formData) {
                inputValueArr.value = formData[name]
            } else {
                inputValueArr.value = props.value
            }
            const { disabled } = props
            return (
                <div class={style['x-range-input']}>
                    <div class="x-range-input-wrap">
                        <InputNumber
                            {..._props}
                            placeholder={placeholder[0]}
                            class="x-range-input_box"
                            bordered={false}
                            value={inputValueArr.value[0]}
                            {...restEvent}
                            {...commonProps}
                            disabled={disabled}
                            onBlur={triggerBlur}
                            onChange={triggerChangeOne}
                        />
                        <span class="x-range-input_separator">
                            <span>
                                <svg
                                    focusable="false"
                                    data-icon="swap-right"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    viewBox="0 0 1024 1024"
                                >
                                    <path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path>
                                </svg>
                            </span>
                        </span>
                        <FormItemRest>
                            <InputNumber
                                {..._props}
                                placeholder={placeholder[1]}
                                class="x-range-input_box"
                                bordered={false}
                                value={inputValueArr.value[1]}
                                {...restEvent}
                                {...commonProps}
                                disabled={disabled}
                                onBlur={triggerBlur}
                                onChange={triggerChangeTow}
                            />
                        </FormItemRest>
                    </div>
                </div>
            )
        }
    },
})
