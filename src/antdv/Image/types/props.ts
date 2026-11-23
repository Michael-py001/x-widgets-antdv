import type { ImageProps } from 'ant-design-vue'
import type { ImageGroupProps } from 'ant-design-vue/es/image/PreviewGroup'
import { ExtractPropTypes } from 'vue'
import { type IDialogChildProps } from 'ant-design-vue/es/vc-dialog/IDialogPropTypes'
import type { VNode, PropType } from 'vue'
export interface PreviewProps extends Omit<IDialogChildProps, 'onClose' | 'mask'> {
    onClose?: (e: Element) => void
    src?: string
    alt?: string
    rootClassName?: string
    icons?: {
        rotateLeft?: VNode
        rotateRight?: VNode
        zoomIn?: VNode
        zoomOut?: VNode
        close?: VNode
        left?: VNode
        right?: VNode
        flipX?: VNode
        flipY?: VNode
    }
}

export const imageProps = () => ({
    //是否用新的预览组件
    layer: {
        type: Boolean,
        default: false,
    },
    // 是否展示预览
    newVisible: {
        type: Boolean,
        default: false,
    },
    // 点击遮罩层是否可以关闭弹窗
    maskClosable: {
        type: Boolean,
        default: true,
    },
    // 是否展示翻转按钮
    showFlip: {
        type: Boolean,
        default: true,
    },
    icons: {
        type: Object as PropType<PreviewProps['icons']>,
        default: () => ({}) as PreviewProps['icons'],
    },
})
export type imagePropsType = Partial<ExtractPropTypes<ReturnType<typeof imageProps>>>

export interface XImageProps extends ImageProps, imagePropsType {}
export interface XImagePreviewGroupProps extends ImageGroupProps {}
