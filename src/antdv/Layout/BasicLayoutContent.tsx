import { defineComponent, unref } from 'vue'
import { LayoutContent } from 'ant-design-vue'

export default defineComponent({
    name: 'XLayoutContent',
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props }

        return () => {
            return <LayoutContent {...propsData}>{slots}</LayoutContent>
        }
    },
})
