import { defineComponent, unref } from 'vue'
import { XPaginationProps } from './types/props'
import { Pagination } from 'ant-design-vue'

const defaultPagination = {
    pageSize: 50,
    pageSizeOptions: ['30', '50', '100', '500'],
}

export default defineComponent<XPaginationProps>({
    name: 'XPagination',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...defaultPagination, ...unref(attrs), ...props } as XPaginationProps

        return () => {
            return <Pagination {...propsData}>{slots}</Pagination>
        }
    },
})
