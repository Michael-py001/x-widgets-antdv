import type { ExtractPropTypes, PropType, Ref, VNodeChild } from 'vue'
import { InputProps, SelectProps, CheckboxProps, RadioProps } from 'ant-design-vue'
export interface FormItemSlotRenderContext {
    item: ColumnForFormItemType
    formData: Record<string, any>
    name: string | number | Array<string | number>
    label: string
}

export type FormItemSlotRender = (context: FormItemSlotRenderContext) => VNodeChild

export interface FormBlockSlotRenderContext {
    item: ColumnForFormItemType
    formData: Record<string, any>
}

export type FormBlockSlotRender = (context: FormBlockSlotRenderContext) => VNodeChild

export type formItemTypes =
    | 'text'
    | 'select'
    | 'textarea'
    | 'input-number'
    | 'input'
    | 'time-picker'
    | 'date-picker'
    | 'time-range-picker'
    | 'checkbox-group'
    | 'radio-group'
    | 'city-picker'
    | 'area-picker'
    | 'tree-select'
    | 'x-tree-select'
    | 'input-password'
    | 'x-input-search'
    | 'input-search'
    | 'x-time-picker'
    | 'x-time-range-picker'
    | 'x-date-picker'
    | 'x-range-picker'
    | 'range-picker'
    | 'x-checkbox-group'
    | 'checkbox'
    | 'x-radio-group'
    | 'x-switch'
    | 'switch'
    | 'x-auto-complete'
    | 'auto-complete'
    | 'range-input'
    | 'c-CityPicker'
    | 'c-text'
    | 'x-select'
    | 'x-textarea'
    | 'x-input-number'
    | 'x-input'
export const formItemProps = () => {
    return {
        name: {
            type: [String, Number, Array] as PropType<string | number | Array<string | number>>,
            default: '',
        },
        rules: {
            type: [Object, Array] as PropType<Array<Record<string, any>> | Record<string, any>>,
            default: null,
        },
        label: {
            type: String as PropType<string>,
            default: '',
        },
        labelAlign: {
            type: String as PropType<'left' | 'center' | 'right'>,
            default: 'right',
        },
        formData: {
            type: Object as PropType<Record<string, any> | Ref<Record<string, any>> | null>,
            default: null,
        },
        attributes: {
            type: Object as PropType<Record<string, any>>,
            default: null,
        },
        props: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        validateInfo: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        cityValidateInfo: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        style: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        //同type , 兼容老版本
        el: {
            type: String as PropType<formItemTypes>,
            default: '',
        },
        type: {
            type: String as PropType<formItemTypes>,
            default: '',
        },
        cityPickerData: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        beforeText: {
            type: String as PropType<string>,
            default: '',
        },
        afterText: {
            type: String as PropType<string>,
            default: '',
        },
        options: {
            type: Array as PropType<Array<Record<string, any>>>,
            default: () => [],
        },
        valueKey: {
            type: String as PropType<string>,
            default: 'value',
        },
        labelKey: {
            type: String as PropType<string>,
            default: 'label',
        },
        align: {
            type: String as PropType<'left' | 'center' | 'around'>,
            default: 'left',
        },
        event: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        textBold: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        autoLabelHeight: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        disabled: {
            type: [Boolean, Object] as PropType<boolean | object>,
            default: false,
        },
        hideRequiredMark: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        addRequiredMark: {
            type: [Boolean, Object] as PropType<boolean | object>,
            default: false,
        },
        textValue: {
            type: [String, Number, Boolean] as PropType<string | number | boolean>,
            default: '',
        },
        unitStyle: {
            type: [String, Object] as PropType<string | Record<string, any>>,
            default: () => ({}),
        },

        // 支持Antdv - FormItem本身的全部属性
        selfProps: {
            type: Object as PropType<Record<string, any>>,
            // type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },

        // 支持FormItem插槽内Antdv表单组件的全部属性
        slotProps: {
            type: Object as PropType<InputProps & SelectProps & CheckboxProps & RadioProps & any>,
            default: (): any => ({}),
        },
        afterSlot: {
            type: [String, Function] as PropType<string | FormItemSlotRender>,
            default: '',
        },
        beforeSlot: {
            type: [String, Function] as PropType<string | FormItemSlotRender>,
            default: '',
        },
        formSlot: {
            type: [String, Function] as PropType<string | FormItemSlotRender>,
            default: '',
        },
    }
}

export type CustomFormItemProps = Partial<ExtractPropTypes<ReturnType<typeof formItemProps>>>

export interface ColumnForFormItemType extends CustomFormItemProps {
    // city-picker的数据
    columnGroup?: Array<Record<string, any>>
    // 插槽名称或返回 Vue VNode 的 TSX render 函数
    slot?: string | FormBlockSlotRender
    colspan?: number
}
