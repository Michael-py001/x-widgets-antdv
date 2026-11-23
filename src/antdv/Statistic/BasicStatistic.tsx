import { defineComponent } from 'vue'
import { Statistic } from 'ant-design-vue'
import { XStatisticProps } from './types/props'

export default defineComponent<XStatisticProps>({
    name: 'XStatistic',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Statistic {...attrs} {...props}>
                    {{ ...slots }}
                </Statistic>
            )
        }
    },
})
