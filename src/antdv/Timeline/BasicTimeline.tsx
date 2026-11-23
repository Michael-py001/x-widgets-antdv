import { defineComponent } from 'vue'
import { Timeline } from 'ant-design-vue'
import { XTimelineProps } from './types/props'

export default defineComponent<XTimelineProps>({
    name: 'XTimeline',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Timeline {...attrs} {...props}>
                    {{ ...slots }}
                </Timeline>
            )
        }
    },
})
