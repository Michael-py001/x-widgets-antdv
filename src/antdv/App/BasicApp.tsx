import { defineComponent, defineAsyncComponent } from 'vue'

let Component = null
const App = defineAsyncComponent(() => import('ant-design-vue/es/app'))

if (App) {
    Component = defineComponent({
        name: 'XApp',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                return (
                    <App {...attrs} {...props}>
                        {{ ...slots }}
                    </App>
                )
            }
        },
    })
}

export default Component
