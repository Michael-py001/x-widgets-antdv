import { PropType, ExtractPropTypes } from 'vue'
import type { ColumnForFormItemType } from '../../FormItem/types/props'
export const searchFormProps = () => {
    return {
        column: {
            //是CustomFormItemProps的数组
            type: Array as PropType<Array<ColumnForFormItemType>>,
            default: () => [],
        },
        formData: {
            type: Object,
            default: () => {},
            required: true,
        },
        // 重置按钮文字，传空则不显示按钮
        resetText: {
            type: String,
            default: '重置',
        },
        // 搜索按钮文字，传空则不显示按钮
        searchText: {
            type: String,
            default: '查询',
        },
        // 加载中
        loading: {
            type: Boolean,
            default: false,
        },
        gutter: {
            type: Array,
            default: () => [12, 12],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        layout: {
            type: String,
            default: 'inline', // horizontal | vertical | inline
        },
        // 是否开启展开收起功能
        enabledExpand: {
            type: Boolean,
            default: true,
        },
        showButtons: {
            type: Boolean,
            default: true,
        },
    }
}

export type SearchFormProps = Partial<ExtractPropTypes<ReturnType<typeof searchFormProps>>>

export type RulesType = {
    [key: string]: any
}

export type FormDataType = {
    [key: string]: any
}
