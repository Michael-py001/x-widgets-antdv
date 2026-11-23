import type { ExtractPropTypes } from 'vue'
export const basicFormProps = () => {
    return {
        label: {
            type: String,
            default: '',
        },
        props: {
            type: Object,
            default: () => ({}),
        },
        name: {
            type: String,
            default: '',
        },
        formData: {
            type: Object,
            default: () => ({}),
        },
        event: {
            type: Object,
            default: () => ({}),
        },
        // 是否格式化为千分位
        formatPrice: {
            type: Boolean,
            default: false,
        },
        // 格式化前缀
        formatPricePrefix: {
            type: String,
            default: '',
        },
        // 格式化后缀
        formatPriceSuffix: {
            type: String,
            default: '',
        },
    }
}
export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>
