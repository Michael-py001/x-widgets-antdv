/**
 * @description: 搜索表单组件
 * @author WuShiLi
 */

import FormItem from '../FormItem/FormItem'
import { defineComponent, ref, reactive, watch, onMounted, unref, computed, nextTick } from 'vue'
import { Form, Button, Row, Col } from 'ant-design-vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
import type { SearchFormProps, RulesType, FormDataType } from './types/props'
import { searchFormProps } from './types/props'
import { useFormTools } from '../../utils/useFormTools'
import './styles/SearchForm.less'
// import svg from './images/down.svg'
export const PARAMS_KEY = 'ANTDV_TABLE_PARAMS'

export default defineComponent<SearchFormProps>({
    name: 'XSearchForm',
    props: {
        ...searchFormProps(),
    },
    emits: ['search', 'reset', 'update:formData', 'expand'],
    setup(props, { attrs, slots, expose, emit }) {
        const useForm = Form.useForm
        const formRef = ref()
        const wrapperRef = ref()
        const compFormData: FormDataType = computed(() => props.formData)
        const {
            createSearchFormRules,
            checkDisplay,
            cityPickerData,
            cityPickerNames,
            getSelectedAddressName,
        } = useFormTools()
        // const compFormData = new Proxy(props.formData, {
        //     get(target, key) {
        //         return Reflect.get(target, key)
        //     },
        //     set(target, key, value) {
        //         emit('update:formData', {
        //             ...target,
        //             [key]: value,
        //         })
        //         return Reflect.set(target, key, value)
        //     },
        // })
        // 搜索
        const handleSearch = () => {
            validate()
                .then(values => {
                    if (sessionStorage.getItem(PARAMS_KEY)) {
                        sessionStorage.removeItem(PARAMS_KEY)
                    }
                    emit('search', values)
                })
                .catch(error => {
                    throw new Error(JSON.stringify(error))
                })
        }

        // 重置
        const handleReset = () => {
            resetFields()
            if (sessionStorage.getItem(PARAMS_KEY)) {
                sessionStorage.removeItem(PARAMS_KEY)
            }
            emit('reset', unref(compFormData))
        }

        // 对外暴露省市区
        const cityPicker = ref([])
        watch(
            () => props.disabled,
            newVal => {
                if (newVal === undefined) return
                props.column.forEach(item => {
                    if (item.disabled === undefined) {
                        item.props = item.props || {}
                        Reflect.set(item.props, 'disabled', newVal)
                    }
                })
            },
            {
                immediate: true,
            },
        )
        const rules: RulesType = reactive(createSearchFormRules(props))

        const { resetFields, validate, validateInfos, clearValidate } = useForm(
            props.formData,
            rules,
        )

        expose({
            handleReset,
            handleSearch,
            form: formRef,
            formRef,
            validate,
            clearValidate,
            resetFields,
            getSelectedAddressName: name => getSelectedAddressName(name, cityPicker.value),
        })

        // 展开收起
        const hasMore = ref(false)
        const showMore = ref(false) // 是否展开
        let debounce = false
        let timer = null

        function handleShowMore() {
            showMore.value = !showMore.value
            nextTick(() => {
                emit('expand', showMore.value)
            })
        }
        const rowRef = ref<any>()
        let innerHeight = 0
        let resizeHandle = () => {}
        onMounted(() => {
            const wrapper = wrapperRef.value
            const antForm = wrapper.querySelector('.ant-form')
            const formHeight = antForm.offsetHeight
            resizeHandle = () => {
                if (debounce) return
                debounce = true
                if (timer) {
                    clearTimeout(timer)
                }

                timer = setTimeout(() => {
                    if (wrapper) {
                        let formItem = antForm.firstChild
                        if (formItem && formItem.nodeType !== 1) {
                            formItem = formItem.nextSibling
                        }
                        const formOverHeight = formItem.offsetHeight

                        if (formOverHeight / formHeight >= 2) {
                            hasMore.value = true
                        } else {
                            hasMore.value = false
                        }
                    }
                    debounce = false
                }, 300)
            }
            props.enabledExpand && resizeHandle() //开启展开收起功能
            window.addEventListener('resize', resizeHandle)
            innerHeight = rowRef.value?.$el?.offsetHeight
        })

        watch(
            compFormData,
            () => {
                if (rowRef.value?.$el?.offsetHeight !== innerHeight) {
                    resizeHandle()
                }
            },
            {
                deep: true,
            },
        )

        return () => {
            return (
                <div
                    class={`x-search-form ${
                        props.enabledExpand && hasMore.value ? 'showMore' : ''
                    }`}
                    ref={wrapperRef}
                >
                    {props.enabledExpand && hasMore.value ? (
                        <span class="x-search-form-more-icon" onClick={handleShowMore}>
                            {showMore.value ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        </span>
                    ) : null}
                    <Form
                        ref={formRef}
                        class={`x-search-form-field ${
                            showMore.value || !props.enabledExpand ? 'showMore' : ''
                        }`}
                        model={compFormData.value}
                        layout={props.layout}
                        {...attrs}
                    >
                        <Row gutter={props.gutter as [number, number]} ref={rowRef}>
                            {props.column.map((item, index) => {
                                const { props: _props } = item as any
                                if (typeof item.slot === 'function') {
                                    return (
                                        <Col key={index} span={item.colspan}>
                                            {item.slot({ item, formData: compFormData.value })}
                                        </Col>
                                    )
                                } else if (item.slot) {
                                    return (
                                        <Col span={item.colspan}>
                                            {slots[item.slot]?.({ item, formData: compFormData.value })}
                                        </Col>
                                    )
                                } else if (item.el || item.type) {
                                    const Item = (
                                        <FormItem
                                            key={index}
                                            ref={el => {
                                                if (cityPickerNames.includes(item.el)) {
                                                    if (!cityPicker.value.includes(el)) {
                                                        cityPicker.value.push(el)
                                                    }
                                                }
                                            }}
                                            hide-required-mark={item.hideRequiredMark}
                                            style={item.style || { 'min-width': '250px' }}
                                            label={item.label}
                                            name={item.name}
                                            type={item.el || item.type}
                                            props={item.props}
                                            attributes={item.attributes}
                                            options={item.options}
                                            form-data={compFormData.value}
                                            label-align={item.labelAlign || 'right'}
                                            textValue={item.textValue}
                                            align={item.align}
                                            event={item.event}
                                            after-text={item.afterText}
                                            before-text={item.beforeText}
                                            validate-info={validateInfos[item.name as any]}
                                            city-validate-info={validateInfos}
                                            city-picker-data={cityPickerData.value}
                                            disabled={_props?.disabled || item.disabled}
                                            selfProps={item.selfProps}
                                            slotProps={item.slotProps}
                                            afterSlot={item.afterSlot}
                                            beforeSlot={item.beforeSlot}
                                            formSlot={item.formSlot}
                                            unitStyle={item.unitStyle}
                                        >
                                            {{
                                                ...slots,
                                            }}
                                        </FormItem>
                                    )
                                    if (checkDisplay(item)) {
                                        return <Col span={item.colspan}>{Item}</Col>
                                    }
                                    return null
                                }
                            })}
                        </Row>
                    </Form>
                    {props.showButtons && (
                        <div class="x-search-form-btns">
                            {props.resetText && (
                                <Button
                                    type="default"
                                    disabled={props.disabled || props.loading}
                                    loading={props.loading}
                                    onClick={handleReset}
                                    class="x-search-form-btn-reset"
                                >
                                    {props.resetText}
                                </Button>
                            )}
                            {props.searchText && (
                                <Button
                                    type="primary"
                                    disabled={props.disabled || props.loading}
                                    loading={props.loading}
                                    onClick={handleSearch}
                                    class="x-search-form-btn-search"
                                >
                                    {props.searchText}
                                </Button>
                            )}
                        </div>
                    )}
                    {slots?.default?.()}
                </div>
            )
        }
    },
})
