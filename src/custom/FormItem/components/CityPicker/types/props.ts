import type {
    ExtractPropTypes,
    PropType,
    Ref,
    Reactive,
    ComponentPublicInstance,
    ComputedRef,
} from 'vue'
export interface CityPickerData {
    name: string
    label?: string
    disabled?: boolean | Ref | Reactive<Boolean>
    list: Ref<any[]> | Ref
    props?: Record<string, any>
    event?: Record<string, any>
    display?: boolean | Ref | Reactive<Boolean>
    handleOptions?: (data: any) => any
    style?: Record<string, any>
}
export const cityPickerProps = () => {
    return {
        // 表单数据
        formData: {
            type: Object,
            default: () => ({}),
        },
        // 校验信息
        cityValidateInfo: {
            type: Object,
            default: () => ({}),
        },
        // 地区级联列表
        cityPickerData: {
            type: Array as PropType<CityPickerData[]>,
            default: () => [],
        },
        //字段名-作为标识
        cityPickerName: {
            type: String,
            default: '',
        },
        onCityPickerChange: {
            type: Function as PropType<onCityPickerChangeType>,
            default: () => {},
        },
    }
}

export type onCityPickerChangeType = (selected: Record<string, any>) => void
export type innerFormDataType = ComputedRef<Record<string, string | number | null>>

export type CityPickerProps = Partial<ExtractPropTypes<ReturnType<typeof cityPickerProps>>>

export interface RegionRequestConfig {
    request?: (params: Record<string, any>) => Promise<{ code: number; data: any; message: string }>
    requestIdName?: string
    fieldNames?: {
        label?: string
        value?: string
    }
    handleRegionData?: (data: any) => any
    handleParams?: (data: any) => any
}
export interface CityPickerType {
    new (): ComponentPublicInstance
    setRigionRequest: (config: RegionRequestConfig) => void
}
