<!-- 
    @Description: 弹窗表单组件
    @Author: WuShiLi
 -->
<template>
    <div class="FormModal">
        <ConfirmPopup
            :width="modalWidth"
            :title="modalTitle"
            :show="show"
            :cancel-text="cancelText"
            :confirm-text="confirmText"
            :ok-btn-loading="okBtnLoading"
            :show-cancel-btn="showCancelBtn"
            :show-confirm-btn="showConfirmBtn"
            :show-footer="showFooter"
            v-bind="$attrs"
            :show-full-screen-icon="showFullScreenIcon"
            :disabled="Boolean($attrs.disabled || $attrs.loading)"
            @confirm="clickConfirm"
            @cancel="clickCancel"
        >
            <template #title>
                <slot name="title"></slot>
            </template>
            <FormPage
                ref="FormPageRef"
                v-model:formData="innerFormData"
                :form-model="formModel"
                :layout="layout"
                :wrapperCol="wrapperCol"
                :labelCol="labelCol"
                :labelAlign="labelAlign"
                :fieldsetStyle="fieldsetStyle"
                :autocomplete="autocomplete"
                asChild
                v-bind="$attrs"
                :gutter="gutter"
            >
                <template
                    v-for="(name, index) in Object.keys(slot)"
                    #[name]="scopeData"
                    :key="index"
                >
                    <slot v-bind="scopeData" :key="index" :name="name"></slot>
                </template>
            </FormPage>
            <template #footer>
                <slot name="modalFooter"></slot>
            </template>
        </ConfirmPopup>
    </div>
</template>

<script setup lang="ts">
import FormPage from '../FormPage/FormPage.vue'
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.vue'
import { computed, ref, useSlots, unref } from 'vue'
import type { PropType } from 'vue'

interface FormModelSection extends Record<string, any> {
    column: Array<Record<string, any>>
}

const slot = useSlots()
defineOptions({
    name: 'XFormModal',
})
const emit = defineEmits(['update:formData', 'confirm', 'cancel', 'update:show'])
const props = defineProps({
    // 弹窗标题
    modalTitle: {
        type: String,
        default: '标题',
    },
    // 是否显示
    show: {
        type: Boolean,
        default: false,
    },
    // 表单字段模型
    formModel: {
        type: Array as PropType<FormModelSection[]>,
        default: () => [],
    },
    // 表单数据
    formData: {
        type: Object,
        default: () => ({}),
    },
    // label样式
    labelCol: {
        type: Object,
        default: () => {
            return { style: { minWidth: '100px' } }
        },
    },
    // 控件样式
    wrapperCol: {
        type: Object,
        default: () => {
            return { span: 17 }
        },
    },
    // 标签文本对齐方式
    labelAlign: {
        type: String,
        default: 'right', //'left' | 'right'
    },
    // 弹窗宽度
    modalWidth: {
        type: [String, Number],
        default: '500px',
    },
    // 重置按钮文字，传空则不显示按钮
    cancelText: {
        type: String,
        default: '取消',
    },
    // 搜索按钮文字，传空则不显示按钮
    confirmText: {
        type: String,
        default: '确认',
    },
    //表单间隔
    gutter: {
        type: Array as unknown as PropType<[number, number]>,
        default: () => [12, 0],
    },
    //表单确按钮loading
    okBtnLoading: {
        type: Boolean,
        default: false,
    },
    // 是否显示取消按钮
    showCancelBtn: {
        type: Boolean,
        default: true,
    },
    // 是否显示确认按钮
    showConfirmBtn: {
        type: Boolean,
        default: true,
    },
    // 表单布局
    layout: {
        type: String,
        default: 'horizontal', //'horizontal' | 'vertical' | 'inline'
    },

    //是否显示footer
    showFooter: {
        type: Boolean,
        default: true,
    },
    autoClose: {
        type: Boolean,
        default: true,
    },
    fieldsetStyle: {
        type: [Object, String],
        default: () => {
            return {}
        },
    },
    //是否显示全屏
    showFullScreenIcon: {
        type: Boolean,
        default: true,
    },
    autocomplete: {
        type: String,
        default: 'on',
    },
})

// const innerFormData = new Proxy(props.formData, {
//     get(target, key, receiver) {
//         return Reflect.get(target, key, receiver)
//     },
//     set(target, key, value, receiver) {
//         emit('update:formData', {
//             ...target,
//             [key]: value,
//         })
//         console.log('props.formData:', props.formData)
//         return Reflect.set(target, key, value, receiver)
//     },
// })

const innerFormData = computed({
    get: () => props.formData,
    set: value => emit('update:formData', value),
})

const FormPageRef = ref(null)

// 确认回调
function clickConfirm() {
    FormPageRef.value
        .validate()
        .then(res => {
            emit('confirm', unref(innerFormData))
        })
        .catch(error => {
            /* eslint-disable */
            console.warn('error:', error)
        })
}

// 取消回调
function clickCancel() {
    if (props.autoClose) {
        FormPageRef.value.resetFields()
        emit('update:show', false)
        emit('cancel', false)
    } else {
        emit('cancel', false)
    }
}

defineExpose({
    resetFields: nameList => FormPageRef.value.resetFields(nameList),
    validateFields: nameList => FormPageRef.value.validateFields(nameList),
    validate: nameList => FormPageRef.value.validate(nameList),
    FormPageRef,
    clickConfirm,
    clickCancel,
    scrollToField: async (name, options) => {
        return FormPageRef?.value.scrollToField(name, options)
    },
    scrollToFields: async (name, options) => {
        return FormPageRef?.value.scrollToFields(name, options)
    },
})
</script>

<style lang="less" scoped>
.FormModal-container {
    .FormModal-footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 14%;
        .ant-btn {
            width: 130px;
            height: 36px;
        }
    }
}
.title {
    font-size: 22px;
    font-weight: bold;
    padding-right: 20px;
}
.second-title {
    font-size: 16px;
}
.title-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.input-line {
    display: flex;
}
.code_img {
    margin-left: 14px;
    height: 32px;
    cursor: pointer;
    .getCaptcha {
        display: block;
        width: 102px;
        height: 32px;
    }
}
</style>
