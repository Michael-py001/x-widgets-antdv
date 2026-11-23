/**
 * @description EditInput 可编辑输入框组件
 * @author WuShiLi
 */

import { defineComponent, ref } from 'vue'
import InputNumber from '../../../../antdv/InputNumber'
import type { EditInputPropsType } from './types/props'
import { EditInputProps } from './types/props'
import style from './style/index.module.less'
import { formatPriceToFixed } from '../../../../utils/widgetHelpers'

export default defineComponent({
    name: 'EditInput',
    props: {
        ...InputNumber.props,
        ...EditInputProps(),
    },
    emits: ['update:value', 'chnage'],
    setup(props: EditInputPropsType, { attrs, emit }) {
        const { onChange, onPressEnter, onBlur, align, bordered, readonly, value, ...restProps } =
            props
        const triggerChange = (value: number | string) => {
            if (!props.editabled) return
            emit('update:value', value)
            emit('chnage', value)
            onChange && onChange(value)
        }

        const triggerPressEnter = (e: KeyboardEvent) => {
            onPressEnter && onPressEnter(e)
        }

        const isEdit = ref(false)

        const triggerBlur = (e: FocusEvent) => {
            if (!props.editabled) return
            isEdit.value = false
            onBlur && onBlur(e)
        }

        const triggerFocus = (e: FocusEvent) => {
            if (!props.editabled) return
            isEdit.value = true
            props.onFocus && props.onFocus(e)
        }

        return () => {
            if (!props.editabled) {
                return <div class={style.EditInput}>{formatPriceToFixed(props.value)}</div>
            }
            return (
                <div class={style.EditInput}>
                    <InputNumber
                        {...attrs}
                        {...restProps}
                        value={props.value}
                        onChange={triggerChange}
                        onPressEnter={triggerPressEnter}
                        onBlur={triggerBlur}
                        onFocus={triggerFocus}
                        class={{
                            [style['align-right']]: align === 'right',
                            [style['align-left']]: align === 'left',
                            [style['align-center']]: align === 'center',
                        }}
                    />
                </div>
            )
        }
    },
})
