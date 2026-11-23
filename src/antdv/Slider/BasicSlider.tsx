import { defineComponent } from 'vue'
import { Slider } from 'ant-design-vue'
import { XSliderProps } from './types/props'

export default defineComponent<XSliderProps>({
    name: 'XSlider',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Slider {...attrs} {...props}>
                    {{ ...slots }}
                </Slider>
            )
        }
    },
})
