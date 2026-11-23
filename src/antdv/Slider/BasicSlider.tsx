import { defineComponent } from 'vue'
import { Slider } from 'ant-design-vue'
import { XSliderProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XSliderProps>({
    name: 'XSlider',

    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Slider.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
        const { formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            // 对于经过custom/FormItem处理的表单项，额外处理
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:value': (value: number | number[]) => {
                        setFormdata(formData, name, value)
                    },
                    value: getValue(formData, name),
                }
            }
            return (
                <Slider {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Slider>
            )
        }
    },
})
