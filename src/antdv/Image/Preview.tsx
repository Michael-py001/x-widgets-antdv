import {
    computed,
    defineComponent,
    onMounted,
    onUnmounted,
    reactive,
    shallowRef,
    watch,
    cloneVNode,
    Ref,
} from 'vue'
import classnames from 'ant-design-vue/es/_util/classNames'
import Dialog from 'ant-design-vue/es/vc-dialog'
import { dialogPropTypes } from 'ant-design-vue/es/vc-dialog/IDialogPropTypes'
import { getOffset } from 'ant-design-vue/es/vc-util/Dom/css'
import addEventListener from 'ant-design-vue/es/vc-util/Dom/addEventListener'
import { warning } from 'ant-design-vue/es/vc-util/warning'
import useFrameSetState from 'ant-design-vue/es/vc-image/src/hooks/useFrameSetState'
import getFixScaleEleTransPosition from 'ant-design-vue/es/vc-image/src/getFixScaleEleTransPosition'
import { Image } from 'ant-design-vue'
import { imageProps } from './types/props'
import './styles/index.less'

const initialPosition = { x: 0, y: 0 }

export const previewProps = {
    ...dialogPropTypes(),
    ...Image.props,
    ...imageProps(),
}

const Preview = defineComponent({
    compatConfig: { MODE: 3 },
    name: 'Preview',
    inheritAttrs: true,
    props: previewProps,
    emits: ['close', 'afterClose'],
    setup(props: any, { emit, attrs }) {
        const { rotateLeft, rotateRight, zoomIn, zoomOut, close, flipX, flipY } = reactive(
            props.icons,
        )

        const scale = shallowRef(1)
        const rotate = shallowRef(0)
        const flip = reactive({ x: 1, y: 1 })
        const [position, setPosition] = useFrameSetState(initialPosition)

        // 关闭预览
        const onClose = () => emit('close')
        const imgRef: Ref<HTMLImageElement | null> = shallowRef(null)
        const originPositionRef = reactive({ originX: 0, originY: 0, deltaX: 0, deltaY: 0 })
        const isMoving = shallowRef(false)
        const combinationSrc = computed(() => props.src)
        const lastWheelZoomDirection = shallowRef({ wheelDirection: 0 })

        // 关闭后重置状态
        const onAfterClose = () => {
            scale.value = 1
            rotate.value = 0
            flip.x = 1
            flip.y = 1
            setPosition(initialPosition)
            emit('afterClose')
        }

        // 放大
        const onZoomIn = (isWheel = false) => {
            scale.value += isWheel ? 0.1 : 1
            if (!isMouseUp.value) setPosition(initialPosition)
        }

        // 缩小
        const onZoomOut = (isWheel = false) => {
            if (scale.value >= 0.11) {
                scale.value -= isWheel ? 0.1 : scale.value > 1 ? 1 : 0.1
            }
            if (!isMouseUp.value) setPosition(initialPosition)
        }

        // 向右旋转
        const onRotateRight = () => (rotate.value += 90)
        // 向左旋转
        const onRotateLeft = () => (rotate.value -= 90)
        // 水平翻转
        const onFlipX = () => (flip.x = -flip.x)
        // 垂直翻转
        const onFlipY = () => (flip.y = -flip.y)

        const wrapClassName = classnames({ [`${props.prefixCls}-moving`]: isMoving.value })
        const toolClassName = `${props.prefixCls}-operations-operation`
        const iconClassName = `${props.prefixCls}-operations-icon`
        const tools = [
            { icon: close, onClick: onClose, type: 'close' },
            { icon: zoomIn, onClick: () => onZoomIn(), type: 'zoomIn' },
            {
                icon: zoomOut,
                onClick: () => onZoomOut(),
                type: 'zoomOut',
                disabled: computed(() => scale.value <= 0.11),
            },
            { icon: rotateRight, onClick: onRotateRight, type: 'rotateRight' },
            { icon: rotateLeft, onClick: onRotateLeft, type: 'rotateLeft' },
            { icon: flipX, onClick: onFlipX, type: 'flipX', display: props.showFlip },
            { icon: flipY, onClick: onFlipY, type: 'flipY', display: props.showFlip },
        ]

        const isMouseUp = shallowRef(false)
        // 鼠标抬起事件
        const onMouseUp = () => {
            if (props.visible && isMoving.value) {
                const width = (imgRef.value?.offsetWidth ?? 0) * scale.value
                const height = (imgRef.value?.offsetHeight ?? 0) * scale.value
                const { left, top } = getOffset(imgRef.value ?? null)
                const isRotate = rotate.value % 180 !== 0
                isMoving.value = false
                const fixState = getFixScaleEleTransPosition(
                    isRotate ? height : width,
                    isRotate ? width : height,
                    left,
                    top,
                )
                const imgDiv = document.querySelector(`.${props.prefixCls}-img`)
                const imgDivObj = imgDiv!.getBoundingClientRect()
                const winWidth = document.documentElement.clientWidth || window.innerWidth
                const winHeight = document.documentElement.clientHeight || window.innerHeight
                const x = imgDivObj.x
                const y = imgDivObj.y
                if (fixState) {
                    isMouseUp.value = true
                    if (
                        x <= 0 - width / 2 ||
                        y <= 0 - height / 2 ||
                        x >= winWidth - width / 2 ||
                        y >= winHeight - height / 2
                    ) {
                        setPosition({ ...fixState })
                    }
                }
            }
        }

        // 鼠标按下事件
        const onMouseDown = (event: MouseEvent) => {
            if (event.button !== 0) return
            event.preventDefault()
            event.stopPropagation()
            originPositionRef.deltaX = event.pageX - position.x
            originPositionRef.deltaY = event.pageY - position.y
            originPositionRef.originX = position.x
            originPositionRef.originY = position.y
            isMoving.value = true
        }

        // 鼠标移动事件
        const onMouseMove = (event: MouseEvent) => {
            if (props.visible && isMoving.value) {
                setPosition({
                    x: event.pageX - originPositionRef.deltaX,
                    y: event.pageY - originPositionRef.deltaY,
                })
            }
        }

        // 滚轮事件
        const onWheelMove = (event: WheelEvent) => {
            if (!props.visible) return
            event.preventDefault()
            lastWheelZoomDirection.value = { wheelDirection: event.deltaY }
        }

        // 键盘事件
        const onKeyDown = (event: KeyboardEvent) => {
            if (!props.visible) return
            event.preventDefault()
        }

        // 双击事件
        const onDoubleClick = () => {
            if (props.visible) {
                if (scale.value !== 1) scale.value = 1
                if (position.x !== initialPosition.x || position.y !== initialPosition.y)
                    setPosition(initialPosition)
            }
        }

        let removeListeners = () => {}
        onMounted(() => {
            watch(
                [() => props.visible, isMoving],
                () => {
                    removeListeners()
                    const onMouseUpListener = addEventListener(window, 'mouseup', onMouseUp, false)
                    const onMouseMoveListener = addEventListener(
                        window,
                        'mousemove',
                        onMouseMove,
                        false,
                    )
                    const onScrollWheelListener = addEventListener(window, 'wheel', onWheelMove, {
                        passive: false,
                    })
                    const onKeyDownListener = addEventListener(window, 'keydown', onKeyDown, false)
                    let onTopMouseUpListener, onTopMouseMoveListener
                    try {
                        if (window.top !== window.self) {
                            onTopMouseUpListener = addEventListener(
                                window.top,
                                'mouseup',
                                onMouseUp,
                                false,
                            )
                            onTopMouseMoveListener = addEventListener(
                                window.top,
                                'mousemove',
                                onMouseMove,
                                false,
                            )
                        }
                    } catch (error) {
                        warning(false, `[vc-image] ${error}`)
                    }
                    removeListeners = () => {
                        onMouseUpListener.remove()
                        onMouseMoveListener.remove()
                        onScrollWheelListener.remove()
                        onKeyDownListener.remove()
                        if (onTopMouseUpListener) onTopMouseUpListener.remove()
                        if (onTopMouseMoveListener) onTopMouseMoveListener.remove()
                    }
                },
                { flush: 'post', immediate: true },
            )
            watch([lastWheelZoomDirection], () => {
                const { wheelDirection } = lastWheelZoomDirection.value
                if (wheelDirection > 0) onZoomOut(true)
                else if (wheelDirection < 0) onZoomIn(true)
            })
        })
        onUnmounted(() => removeListeners())

        return () => {
            const { visible, prefixCls, rootClassName } = props

            return (
                <Dialog
                    {...attrs}
                    transitionName={props.transitionName}
                    maskTransitionName={props.maskTransitionName}
                    closable={false}
                    keyboard
                    prefixCls={prefixCls}
                    onClose={onClose}
                    afterClose={onAfterClose}
                    visible={visible}
                    wrapClassName={wrapClassName}
                    rootClassName={rootClassName}
                    getContainer={props.getContainer}
                    maskClosable={props.maskClosable}
                >
                    <div class={[`${props.prefixCls}-operations-wrapper`, rootClassName]}>
                        <ul class={`${props.prefixCls}-operations`}>
                            {tools.map(({ icon: IconType, onClick, type, disabled, display }) => (
                                <li
                                    style={{ display: (display ?? true) ? 'block' : 'none' }}
                                    class={classnames(toolClassName, {
                                        [`${props.prefixCls}-operations-operation-disabled`]:
                                            disabled?.value,
                                    })}
                                    onClick={onClick}
                                    key={type}
                                >
                                    {cloneVNode(IconType, { class: iconClassName })}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        class={`${props.prefixCls}-img-wrapper`}
                        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
                    >
                        <img
                            onDblclick={onDoubleClick}
                            onMousedown={onMouseDown}
                            ref={imgRef}
                            class={`${props.prefixCls}-img`}
                            src={combinationSrc.value}
                            alt={props.alt}
                            style={{
                                transform: `scale3d(${flip.x * scale.value}, ${flip.y * scale.value}, 1) rotate(${rotate.value}deg)`,
                            }}
                        />
                    </div>
                </Dialog>
            )
        }
    },
})

export default Preview
