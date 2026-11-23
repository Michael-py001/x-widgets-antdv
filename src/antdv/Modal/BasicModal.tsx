import { defineComponent, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import {
    CloseCircleFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
} from '@ant-design/icons-vue'
import type { XModalProps } from './types/props'
import { propsValue } from './types/props'
import './styles/reset.less'

export default defineComponent<XModalProps>({
    name: 'XModal',
    info: Modal.info,
    success: Modal.success,
    error: Modal.error,
    warning: Modal.warning,
    confirm: Modal.confirm,
    destroyAll: Modal.destroyAll,
    useModal: Modal.useModal,
    props: {
        ...Modal.props,
        ...propsValue(),
    },
    setup(props: XModalProps, { attrs, slots, emit }) {
        // 拓展全屏按钮
        const fullScreen = ref(props.fullScreen)
        function handleFullScreen(e: { stopPropagation: () => void }) {
            e.stopPropagation()
            fullScreen.value = !fullScreen.value
            emit('update:fullScreen', fullScreen.value)
        }

        return () => {
            return (
                <Modal
                    {...attrs}
                    {...props}
                    wrap-class-name={fullScreen.value ? 'x-modal-full-screen' : props.wrapClassName}
                    width={fullScreen.value ? '100%' : props.width}
                    aria-hidden={props.open}
                >
                    {{
                        closeIcon: () => {
                            return (
                                <span class="x-modal-icons">
                                    {/* 全屏按钮 */}
                                    {props.showFullScreenIcon && (
                                        <span
                                            class={`x-full-screen-icon`}
                                            onClick={handleFullScreen}
                                            title={fullScreen.value ? '退出全屏' : '全屏'}
                                        >
                                            {!fullScreen.value ? (
                                                <FullscreenOutlined />
                                            ) : (
                                                <FullscreenExitOutlined />
                                            )}
                                        </span>
                                    )}
                                    <span class={`antd-close-x`}>
                                        {slots.closeIcon?.() || (
                                            <CloseCircleFilled class={`antd-close-icon`} />
                                        )}
                                    </span>
                                </span>
                            )
                        },
                        ...slots,
                    }}
                </Modal>
            )
        }
    },
})
