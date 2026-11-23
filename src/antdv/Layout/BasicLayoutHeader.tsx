import { defineComponent, unref } from 'vue'
import { LayoutHeader } from 'ant-design-vue'

export default defineComponent({
    name: 'XLayoutHeader',
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props }

        return () => {
            return <LayoutHeader {...propsData}>{slots}</LayoutHeader>
        }
    },
})
