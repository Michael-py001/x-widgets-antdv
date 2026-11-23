import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { XConfigProviderProps } from './types/props'

export default defineComponent<XConfigProviderProps>({
    name: 'XConfigProvider',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <ConfigProvider {...attrs} {...props}>
                    {{ ...slots }}
                </ConfigProvider>
            )
        }
    },
})
