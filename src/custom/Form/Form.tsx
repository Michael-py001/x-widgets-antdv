/**
 * @description Form 表单组件
 * @author WuShiLi
 */

import { defineComponent, computed, ref } from 'vue'
import type { Ref } from 'vue'
import { Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useProvideForm } from './context'

export interface FormProps {
    model?: Record<string, any>
    rules?: Record<string, Rule[]>
}

interface formRefType {
    validateFields: (nameList: string[]) => Promise<any>
    validate: (nameList: string[]) => Promise<any>
    resetFields: (nameList: string[]) => void
    clearValidate: (nameList: string[]) => void
    scrollToField: (name: string, options: Object) => void
    setFieldsValue: (values: Record<string, any>) => void
    getFieldsValue: () => Record<string, any>
    getFieldsError: (nameList: string[]) => Record<string, any>
    getFieldValue: (name: string) => any
    getFieldError: (name: string) => string[]
}

export default defineComponent({
    name: 'CustomForm',
    props: {
        model: {
            type: Object,
            default: () => ({}),
        },
        rules: {
            type: Object,
            default: () => ({}),
        },
    },
    useForm: Form.useForm,
    setup(props, { slots, expose, attrs }) {
        useProvideForm({
            model: computed(() => props.model),
            rules: computed(() => props.rules),
        })

        const formRef: Ref<formRefType> = ref({} as formRefType)

        expose({
            validateFields: (nameList: string[]) => {
                return formRef?.value!.validateFields(nameList)
            },
            validate: (nameList: string[]) => {
                return formRef?.value!.validate(nameList)
            },
            resetFields: (nameList: string[]) => {
                return formRef?.value.resetFields(nameList)
            },
            clearValidate: (nameList: string[]) => {
                return formRef?.value.clearValidate(nameList)
            },
            scrollToField: (name, options) => {
                return formRef?.value.scrollToField(name, options)
            },
            setFieldsValue: (values: string[]) => {
                return formRef?.value.setFieldsValue(values)
            },
            getFieldsValue: () => {
                return formRef?.value.getFieldsValue()
            },
            getFieldsError: (nameList: string[]) => {
                return formRef?.value.getFieldsError(nameList)
            },
            getFieldValue: (name: string) => {
                return formRef?.value.getFieldValue(name)
            },
            getFieldError: (name: string) => {
                return formRef?.value.getFieldError(name)
            },
        })
        return () => {
            return (
                <Form
                    {...attrs}
                    model={props.model}
                    rules={props.rules}
                    ref={instance => (formRef.value = instance as any)}
                >
                    {slots.default?.()}
                </Form>
            )
        }
    },
})
