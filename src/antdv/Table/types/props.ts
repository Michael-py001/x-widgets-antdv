import { TableProps } from 'ant-design-vue'
import { ExtractPropTypes } from 'vue'

export const tableProps = () => {
    return {
        emptyImage: {
            type: String,
            default: '',
        },
        striped: {
            type: Boolean,
            default: true,
        },
        // 表格内容高度是否自适应
        autoSrcollHeight: {
            type: Boolean,
            default: true,
        },
        // 表格内容高度是否只获取一次
        getSrcollHeightOnce: {
            type: Boolean,
            default: false,
        },
        //额外的高度
        extraHeight: {
            type: Number,
            default: 0,
        },
        // 关闭修改默认样式
        useDefaultStyle: {
            type: Boolean,
            default: false,
        },
        emptyText: {
            type: String,
            default: '暂无数据',
        },
        //树形结构增加收起行
        showUpOut: {
            type: Boolean,
            default: false,
        },
    }
}

export type tablePropsType = Partial<ExtractPropTypes<ReturnType<typeof tableProps>>>

export interface XTableProps extends TableProps, tablePropsType {}
