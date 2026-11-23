import type { ExtractPropTypes, PropType } from 'vue'
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
        placeholder: {
            type: Array as PropType<string[]>,
            default: ['请输入', '请输入'],
        },
        value: {
            type: Array as PropType<string[]>,
            default: ['', ''],
        },
        'onUpdate:value': {
            type: Function,
            default: () => {},
        },
    }
}
export type BasicFormProps = Partial<ExtractPropTypes<ReturnType<typeof basicFormProps>>>
