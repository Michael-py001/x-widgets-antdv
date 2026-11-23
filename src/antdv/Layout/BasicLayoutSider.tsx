import { defineComponent, unref } from 'vue'
import { LayoutSider } from 'ant-design-vue'

export default defineComponent({
    name: 'XLayoutSider',
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props }

        return () => {
            return <LayoutSider {...propsData}>{slots}</LayoutSider>
        }
    },
})
