import { defineComponent, unref } from 'vue'
import { LayoutFooter } from 'ant-design-vue'

export default defineComponent({
    name: 'XLayoutFooter',
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props }

        return () => {
            return <LayoutFooter {...propsData}>{slots}</LayoutFooter>
        }
    },
})
