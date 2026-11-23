import { defineComponent } from 'vue'
import { Affix } from 'ant-design-vue'
import { XAffixProps } from './types/props'

export default defineComponent<XAffixProps>({
    name: 'XAffix',

    inheritAttrs: true,
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Affix {...attrs} {...props}>
                    {{ ...slots }}
                </Affix>
            )
        }
    },
})
