import { defineComponent, computed } from 'vue'
import { Image } from 'ant-design-vue'
import Preview from './Preview'
import { imageProps } from './types/props'
import useConfigInject from 'ant-design-vue/es/config-provider/hooks/useConfigInject'
import useStyle from 'ant-design-vue/es/image/style'
import { getTransitionName } from 'ant-design-vue/es/_util/transition'
import classNames from 'ant-design-vue/es/_util/classNames'

import RotateLeftOutlined from '@ant-design/icons-vue/RotateLeftOutlined'
import RotateRightOutlined from '@ant-design/icons-vue/RotateRightOutlined'
import ZoomInOutlined from '@ant-design/icons-vue/ZoomInOutlined'
import ZoomOutOutlined from '@ant-design/icons-vue/ZoomOutOutlined'
import CloseOutlined from '@ant-design/icons-vue/CloseOutlined'
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined'
import RightOutlined from '@ant-design/icons-vue/RightOutlined'
import SwapOutlined from '@ant-design/icons-vue/SwapOutlined'

export const icons = {
    rotateLeft: <RotateLeftOutlined />,
    rotateRight: <RotateRightOutlined />,
    zoomIn: <ZoomInOutlined />,
    zoomOut: <ZoomOutOutlined />,
    close: <CloseOutlined />,
    left: <LeftOutlined />,
    right: <RightOutlined />,
    flipX: <SwapOutlined />,
    flipY: <SwapOutlined rotate={90} />,
}

const propsValue = {
    ...Image.props,
    ...imageProps(),
}

export default defineComponent({
    name: 'XImage',
    inheritAttrs: true,
    props: propsValue,
    setup(props: any, { attrs, slots, emit }) {
        const { prefixCls, rootPrefixCls } = useConfigInject('image', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const previewPrefixCls = computed(() => `${prefixCls.value}-preview`)

        const mergedPreview = computed(() => {
            const { preview } = props
            if (preview === false) return preview

            const _preview = typeof preview === 'object' ? preview : {}
            return {
                icons,
                ..._preview,
                transitionName: getTransitionName(
                    rootPrefixCls.value,
                    'zoom',
                    _preview.transitionName,
                ),
                maskTransitionName: getTransitionName(
                    rootPrefixCls.value,
                    'fade',
                    _preview.maskTransitionName,
                ),
            }
        })

        const onPreview = () => {
            if (props.layer) emit('update:newVisible', true)
        }

        const onPreviewClose = () => {
            emit('close')
        }

        return () => (
            <div>
                <Image
                    {...attrs}
                    {...props}
                    onClick={onPreview}
                    preview={props.layer ? { visible: false } : props.preview}
                >
                    {slots.default?.()}
                </Image>
                {props.layer &&
                    props.newVisible &&
                    wrapSSR(
                        <Preview
                            {...props}
                            {...attrs}
                            {...mergedPreview.value}
                            aria-hidden={!props.newVisible}
                            visible={props.newVisible}
                            close={onPreviewClose}
                            prefixCls={previewPrefixCls.value}
                            rootClassName={classNames(props.rootClassName, hashId.value)}
                            style={{ display: props.newVisible ? 'block' : 'none' }}
                        />,
                    )}
            </div>
        )
    },
})
