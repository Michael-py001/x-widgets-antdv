import { defineComponent } from 'vue'
import { ImagePreviewGroup } from 'ant-design-vue'
import { XImagePreviewGroupProps } from './types/props'

export default defineComponent({
    name: 'XImagePreviewGroup',
    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...ImagePreviewGroup.props,
    },
    setup(props: XImagePreviewGroupProps, { attrs, slots }) {
        return () => {
            return (
                <ImagePreviewGroup {...attrs} {...props}>
                    {slots}
                </ImagePreviewGroup>
            )
        }
    },
})
