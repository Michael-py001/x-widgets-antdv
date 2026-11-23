<!-- 
    @Description: 表单页面组件
    @Author: WuShiLi
 -->
<template>
    <div
        ref="FormPageContainerRef"
        class="x-formpage-container"
        :style="$attrs.style || FormPageContainerHeight"
    >
        <div v-if="$slots.header" ref="headerRef" class="x-formpage-container-fixed-header">
            <slot name="header"></slot>
        </div>
        <Spin :spinning="loading">
            <div ref="formRef" style="overflow-y: auto" class="formRef">
                <Form
                    ref="formContainerRef"
                    class="x-formpage-container-form"
                    :layout="layout"
                    :autocomplete="autocomplete"
                    :wrapper-col="wrapperCol"
                    :label-col="labelCol"
                    :label-align="labelAlign"
                    v-bind="$attrs"
                    :model="formData"
                    :rules="rules"
                >
                    <fieldset
                        ref="fieldsetRef"
                        :disabled="disabled"
                        :style="fieldsetStyle"
                        class="form-container"
                        :class="{ 'form-container-grid': fieldsetGridTemplate }"
                    >
                        <template v-for="(model, j) in formModel" :key="j">
                            <!-- :disabled="model.disabled" -->
                            <template v-if="checkDisplay(model)">
                                <fieldset
                                    ref="fieldsetRef"
                                    :disabled="false"
                                    :style="model.fieldsetStyle"
                                >
                                    <template v-if="model.title">
                                        <slot name="modelTitle" :model="model" :title="model.title">
                                            <template v-if="!!hasModelTitleComponent">
                                                <component
                                                    :is="
                                                        resolveComponent(
                                                            'defaultModelTitleComponent',
                                                        )
                                                    "
                                                    :title="model.title"
                                                ></component>
                                            </template>
                                            <template v-else>
                                                <div v-if="model.divider === false" class="title">
                                                    {{ model.title }}
                                                </div>
                                                <Divider v-else orientation="left" dashed>
                                                    {{ model.title }}
                                                </Divider>
                                            </template>
                                        </slot>
                                    </template>
                                    <div
                                        v-if="model.display"
                                        :id="`fieldset_${j}`"
                                        :style="model.style"
                                        :class="model.class"
                                    >
                                        <Row :gutter="gutter">
                                            <template
                                                v-for="(item, index) in model.column"
                                                :key="index"
                                            >
                                                <Col
                                                    v-if="checkDisplay(item)"
                                                    v-show="isShow(item)"
                                                    :span="item.colspan || colspan"
                                                >
                                                    <template v-if="item.slot">
                                                        <component
                                                            v-if="typeof item.slot === 'function'"
                                                            :is="item.slot"
                                                            :item="item"
                                                            :formData="formData"
                                                        />
                                                        <slot
                                                            v-else
                                                            :name="item.slot"
                                                            :item="item"
                                                            :formData="formData"
                                                        ></slot>
                                                    </template>
                                                    <FormItem
                                                        v-else-if="
                                                            item.el || item.type || item.formSlot
                                                        "
                                                        :ref="
                                                            el => {
                                                                if (
                                                                    cityPickerNames.includes(
                                                                        item.el,
                                                                    )
                                                                ) {
                                                                    if (!cityPicker.includes(el)) {
                                                                        cityPicker.push(el)
                                                                    }
                                                                }
                                                            }
                                                        "
                                                        :hide-required-mark="item.hideRequiredMark"
                                                        :addRequiredMark="item.addRequiredMark"
                                                        :style="{
                                                            paddingBottom: verticalGap + 'px',
                                                            ...item.style,
                                                        }"
                                                        :label="item.label"
                                                        :name="item.name"
                                                        :type="item.el || item.type"
                                                        :props="item.props"
                                                        :attributes="item.attributes"
                                                        :options="
                                                            typeof item.options === 'function'
                                                                ? item.options(formData)
                                                                : item.options
                                                        "
                                                        :form-data="innerFormData"
                                                        :wrapper-col="item.wrapperCol || wrapperCol"
                                                        :city-validate-info="validateInfos"
                                                        :city-picker-data="cityPickerData"
                                                        :textValue="item.textValue"
                                                        :event="item.event"
                                                        :align="item.align"
                                                        :after-text="item.afterText"
                                                        :before-text="item.beforeText"
                                                        :textBold="item.textBold"
                                                        :trim="item.trim"
                                                        :unitStyle="item.unitStyle"
                                                        :disabled="
                                                            item.disabled || item.props?.disabled
                                                        "
                                                        :labelAlign="item.labelAlign || labelAlign"
                                                        :autoLabelHeight="item.autoLabelHeight"
                                                        :selfProps="item.selfProps"
                                                        :slotProps="item.slotProps"
                                                        :afterSlot="item.afterSlot"
                                                        :beforeSlot="item.beforeSlot"
                                                        :formSlot="item.formSlot"
                                                        :rules="rules[item.name]"
                                                        @clear-validate="handleClearValidate"
                                                        @validate-name="validateName"
                                                        @city-picker-change="handleCityPickerChange"
                                                    >
                                                        <template
                                                            v-for="(name, i) in Object.keys(slot)"
                                                            #[name]="scopeData"
                                                            :key="i"
                                                        >
                                                            <slot
                                                                v-bind="scopeData"
                                                                :key="index"
                                                                :name="name"
                                                                :formData="formData"
                                                                :item="item"
                                                            ></slot>
                                                        </template>
                                                    </FormItem>
                                                </Col>
                                            </template>
                                        </Row>
                                    </div>
                                </fieldset>
                            </template>
                        </template>
                    </fieldset>
                </Form>
            </div>
        </Spin>
        <div v-if="$slots.footer" ref="footerRef" class="x-formpage-container-fixed-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue'
const hasModelTitleComponent = ref(false)

export default {
    name: 'XFormPage',
    components: {
        defaultModelTitleComponent: null,
    },
    setTitleComponent(component: any) {
        hasModelTitleComponent.value = true
        this.components.defaultModelTitleComponent = component
    },
}
</script>
<script setup lang="ts">
import { Row, Spin, Divider, Col } from 'ant-design-vue'
import {
    nextTick,
    useSlots,
    defineComponent,
    watch,
    isRef,
    computed,
    reactive,
    onMounted,
    unref,
    provide,
    toRefs,
    resolveComponent,
    inject,
} from 'vue'
import type { PropType } from 'vue'
import FormItem from '../FormItem/FormItem'
import Form from '../Form/Form'
import { useFormTools } from '../../utils/useFormTools'
import useScrollToFields from './composables/useScrollToFields'
let { footer: footerSlot, header: headerSlot } = useSlots()
const {
    createFormPageRules,
    checkDisplay,
    isShow,
    cityPickerData,
    cityPickerNames,
    getSelectedAddressName,
} = useFormTools()

const useForm = Form.useForm
const emit = defineEmits([
    'update:formData',
    'confirm',
    'cancel',
    'update:show',
    'cityPickerChange',
])
defineOptions({
    name: 'XFormPage',
})
const slot = useSlots()
const props = defineProps({
    // 表单字段模型
    formModel: {
        type: Array as PropType<Array<Record<string, any> & { column: Array<Record<string, any>> }>>,
        default: () => [],
    },
    // 表单数据
    formData: {
        type: Object as PropType<Record<string, any>>,
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
        default: 'left', //'left' | 'right'
    },
    // 是否显示loading
    loading: {
        type: Boolean,
        default: false,
    },
    // 作为子组件
    asChild: {
        type: Boolean,
        default: false,
    },
    // 字段垂直间隔
    verticalGap: {
        type: [String, Number],
        default: '0',
    },
    // 表单容器多余高度
    extraHeight: {
        type: [String, Number],
        default: 0,
    },
    // 表单布局
    layout: {
        type: String,
        default: 'horizontal', //'horizontal' | 'vertical' | 'inline'
    },
    //字段colspan
    colspan: {
        type: Number,
        default: 24,
    },
    //表单间隔
    gutter: {
        type: Array as unknown as PropType<[number, number]>,
        default: () => [12, 0],
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: undefined,
    },
    fieldsetStyle: {
        type: [Object, String],
        default: () => {
            return {}
        },
    },
    autocomplete: {
        type: String,
        default: 'on',
    },
})
const formContainerRef = ref(null)
const fieldsetGridTemplate = computed(
    () => typeof props.fieldsetStyle !== 'string' && props.fieldsetStyle.gridTemplate,
)
// 是否作为插槽组件 兼容props.asChild优先
let isChild = ref(false)

const innerFormData = computed({
    get: () => props.formData,
    set: value => emit('update:formData', value),
})

// 对外暴露省市区
let cityPicker = ref([])

setDisabledWatch()
const rules = reactive(createFormPageRules(props))

function _validate(nameList) {
    return formContainerRef?.value.validate(nameList)
}

function _clearValidate(nameList) {
    return formContainerRef?.value?.clearValidate(nameList)
}

// 创建表单容器
let { validateInfos } = useForm(props.formData, rules)

//校验单个字段
function validateName(name) {
    _validate([name])
}
//清除表单字段校验
function handleClearValidate(name) {
    _clearValidate([name])
}

//恢复表单字段校验
async function resetValidate(name) {
    _clearValidate([name])
}

function handleCityPickerChange(data) {
    emit('cityPickerChange', data)
}

function setDisabledWatch() {
    watch(
        () => props.disabled,
        (newVal, oldValue) => {
            if (newVal === undefined) return
            props.formModel.forEach(item => {
                item.column.forEach(i => {
                    if (i.props?.disabled !== undefined) {
                        i.props = i.props || {}
                        Reflect.set(i.props, 'disabled', newVal)
                    }
                })
            })
        },
        {
            immediate: true,
        },
    )
}

// 获取footer高度
let footerRef = ref(null),
    headerRef = ref(null),
    formRef = ref(null),
    FormPageContainerRef = ref(null)

let footerHeight = ref(0)
const headerHeight = computed(() => {
    return headerRef.value?.offsetHeight || 0
})
const FormPageContainerHeight = computed(() => {
    let height = 'auto'
    if (props.extraHeight) {
        height = `calc(100vh - ${props.extraHeight})`
    } else if (props.asChild || isChild.value) {
        height = 'auto'
    }
    return {
        height: height,
    }
})

let fieldsetRef = ref(null)

provide('isSlot', true)
const _isSlot = inject('isSlot', false)
if (_isSlot || props.asChild) {
    isChild.value = true
}

const { scrollToFields } = useScrollToFields({
    formModel: props.formModel,
    FormPageContainerRef: FormPageContainerRef,
})

defineExpose({
    resetFields: nameList => {
        return formContainerRef?.value.resetFields(nameList)
    },
    validate: _validate,
    clearValidate: _clearValidate,
    validateFields: nameList => {
        return formContainerRef?.value.validateFields(nameList)
    },
    scrollToField: (name, options) => {
        return formContainerRef?.value.scrollToField(name, options)
    },
    scrollToFields: (names, options) => {
        scrollToFields(names, options)
    },
    resetValidate,
    getSelectedAddressName: name => getSelectedAddressName(name, cityPicker.value),
    footerHeight,
    headerHeight,
    FormPageContainerHeight,
    _name: 'FormPage',
    cityPicker,
    rules,
    hasModelTitleComponent: hasModelTitleComponent,
    el: FormPageContainerRef,
})
</script>
<style lang="less" scoped>
@import './style/formDisabled.less';
@pagewidth: calc (100vw - 239px);

.x-formpage-container {
    position: relative;
    width: 100%;

    .form-container {
        &.form-container-grid {
            display: grid;
        }
    }

    &-form {
        padding: 0 8px 4px;
        box-sizing: border-box;
    }

    &-fixed {
        &-footer {
            border-top: 1px solid #d6d3d3;
            padding-bottom: 10px;
            position: sticky;
            bottom: 0;
            left: 0;
            flex: 1;
            background-color: #fff;
            width: 100%;
            z-index: 8;
        }

        &-header {
            width: 100%;
            z-index: 1;
        }
    }

    .title {
        font-weight: 600;
        color: #7f7f7f;
        font-size: 16px;
        white-space: nowrap;
        text-align: left;
        padding-bottom: 12px;
        padding-top: 8px;
    }

    // 分隔线
    ::v-deep(.ant-divider-horizontal) {
        .ant-divider-inner-text {
            font-weight: 600;
            color: #7f7f7f;
        }
    }
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
