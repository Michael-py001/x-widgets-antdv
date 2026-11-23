import { defineComponent } from 'vue'
import { Skeleton } from 'ant-design-vue'
import { XSkeletonProps } from './types/props'

export default defineComponent<XSkeletonProps>({
    name: 'XSkeleton',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Skeleton {...attrs} {...props}>
                    {{ ...slots }}
                </Skeleton>
            )
        }
    },
})
