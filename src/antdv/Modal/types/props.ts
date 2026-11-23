import { ModalProps } from 'ant-design-vue'
import { ExtractPropTypes } from 'vue'

export const propsValue = () => ({
    // 是否显示全屏按钮
    showFullScreenIcon: {
        type: Boolean,
        default: false,
    },
    fullScreen: {
        type: Boolean,
        default: false,
    },
})

export type XModalPropsType = Partial<ExtractPropTypes<ReturnType<typeof propsValue>>>
export interface XModalProps extends ModalProps, XModalPropsType {}
