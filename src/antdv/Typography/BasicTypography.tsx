import { defineComponent, unref } from 'vue'
import { XTypographyProps } from './types/props'
import { Typography } from 'ant-design-vue'

export default defineComponent<XTypographyProps>({
    name: 'XTypography',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XTypographyProps

        return () => {
            return <Typography {...propsData}>{slots}</Typography>
        }
    },
})
