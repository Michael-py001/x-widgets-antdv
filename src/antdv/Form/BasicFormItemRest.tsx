import { defineComponent, defineAsyncComponent } from 'vue'
let Component = null
const FormItemRest = defineAsyncComponent(() =>
    import('ant-design-vue/es/form').then(module => module.FormItemRest),
)

if (FormItemRest) {
    Component = defineComponent({
        name: 'XFormItemRest',
        inheritAttrs: true, // TAG: Props Reactive
        setup(props, { attrs, slots }) {
            return () => {
                const propsData = { ...attrs, ...props }
                return <FormItemRest {...propsData}>{slots}</FormItemRest>
            }
        },
    })
}

export default Component
