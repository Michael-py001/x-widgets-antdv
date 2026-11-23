import { defineComponent, unref } from 'vue'
import { XStepsProps } from './types/props'
import { Steps } from 'ant-design-vue'

export default defineComponent<XStepsProps>({
    name: 'XSteps',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XStepsProps

        return () => {
            return <Steps {...propsData}>{slots}</Steps>
        }
    },
})
