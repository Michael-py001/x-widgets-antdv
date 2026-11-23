import { defineComponent, ref } from 'vue'
import { Form } from 'ant-design-vue'
import { XFormProps } from './types/props'

export default defineComponent({
    name: 'XForm',
    useForm: Form.useForm,
    setup(props, { attrs, slots, expose }) {
        const propsData = { ...attrs, ...props } as XFormProps
        const _instance = ref(null)

        const resetFields = () => {
            return _instance.value.resetFields()
        }

        const clearValidate = () => {
            return _instance.value.clearValidate()
        }

        const validateFields = (keys: string[]) => {
            return _instance.value.validateFields(keys)
        }

        const getFieldsValue = () => {
            return _instance.value.getFieldsValue()
        }

        const validate = (keys: string[]) => {
            return _instance.value.validate(keys)
        }

        const scrollToField = () => {
            return _instance.value.scrollToField()
        }

        expose({
            resetFields,
            clearValidate,
            validateFields,
            getFieldsValue,
            validate,
            scrollToField,
        })

        return () => {
            return (
                <Form {...propsData} ref={_instance}>
                    {slots}
                </Form>
            )
        }
    },
})
