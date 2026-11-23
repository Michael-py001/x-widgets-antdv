/**
 * @description 表单项组件
 * @author WuShiLi
 */

import { defineComponent, computed, unref, ref, toRefs, isRef } from 'vue'
import type { Ref } from 'vue'
import { FormItem as AntFormItem } from 'ant-design-vue'
import Text from './components/Text/Text.vue'
import Select from '../../antdv/Select/BasicSelect'
import TreeSelect from '../../antdv/TreeSelect/BasicTreeSelect'
import Textarea from '../../antdv/Textarea/BasicTextarea'
import InputNumber from '../../antdv/InputNumber/BasicInputNumber'
import InputPassword from '../../antdv/Input/BasicInputPassword'
import Input from '../../antdv/Input/BasicInput'
import InputSearch from '../../antdv/Input/BasicInputSearch'
import AutoComplete from '../../antdv/AutoComplete/BasicAutoComplete'
import TimePicker from '../../antdv/TimePicker/BasicTimePicker'
import DatePicker from '../../antdv/DatePicker/BasicDatePicker'
import TimeRangePicker from '../../antdv/TimeRangePicker/BasicTimeRangePicker'
import RangePicker from '../../antdv/RangePicker/BasicRangePicker'
import CheckboxGroup from '../../antdv/CheckboxGroup/BasicCheckboxGroup'
import Checkbox from '../../antdv/Checkbox/BasicCheckbox'
import RadioGroup from '../../antdv/RadioGroup/BasicRadioGroup'
import Switch from '../../antdv/Switch/BasicSwitch'
import CityPicker from './components/CityPicker/CityPicker'
import AreaPicker from './components/CityPicker/AreaPicker'
import RangeInput from './components/RangeInput/RangeInput'
import { useInjectForm } from '../Form/context'
import formItemStyle from './style/FormItem.module.less'
import type { FormContextProps } from '../Form/context'
import { formItemProps } from './types/props'
import type { CustomFormItemProps, FormItemSlotRender } from './types/props'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const FormItem = AntFormItem as any

dayjs.locale('zh-cn')

function getName(name) {
    // if (Array.isArray(name)) {
    //     return name.join(',')
    // }
    return name
}

const FormItemComponent = defineComponent<CustomFormItemProps>({
    name: 'CustomFormItem',
    props: {
        ...formItemProps(),
    },
    emits: ['clearValidate', 'validateName', 'cityPickerChange'],
    setup(props, { emit, expose, attrs, slots }) {
        const fieldName = computed(() => props.name)
        const formContext: FormContextProps = useInjectForm()
        const rulesRef = computed(() => {
            return (
                props.rules ||
                (formContext?.rules?.value &&
                    formContext?.rules?.value[getName(fieldName.value)]) ||
                []
            )
        })
        const injectData = computed(() => formContext?.model?.value)

        const injectFormData = props.formData || unref(injectData) || {}

        const innerOptions = computed(() => {
            if (props.options) {
                let options: Array<Record<string, any>>
                if (isRef(props.options) && props.options.value instanceof Array) {
                    options = [...props.options.value]
                } else if (props.options.length > 0) {
                    options = [...props.options]
                }
                return options?.map(item => {
                    // 处理value为boolean类型，或者为字符串的false,true 情况
                    if (
                        item.value === 'false' ||
                        (typeof item.value === 'boolean' && item.value === false)
                    ) {
                        item.value = 0
                    } else if (
                        item.value === 'true' ||
                        (typeof item.value === 'boolean' && item.value === true)
                    ) {
                        item.value = 1
                    }
                    return item
                })
            }
            return props.options
        })
        //组件视图
        const widgetMap: Record<string, any> = {
            'c-text': Text,
            text: Text,
            'x-select': Select,
            select: Select,
            'tree-select': TreeSelect,
            'x-tree-select': TreeSelect,
            'x-textarea': Textarea,
            textarea: Textarea,
            'x-input-number': InputNumber,
            'input-number': InputNumber,
            'input-password': InputPassword,
            'x-input': Input,
            input: Input,
            'x-input-search': InputSearch,
            'input-search': InputSearch,
            'x-time-picker': TimePicker,
            'time-picker': TimePicker,
            'x-time-range-picker': TimeRangePicker,
            'time-range-picker': TimeRangePicker,
            'x-date-picker': DatePicker,
            'date-picker': DatePicker,
            'x-range-picker': RangePicker,
            'range-picker': RangePicker,
            'x-checkbox-group': CheckboxGroup,
            'checkbox-group': CheckboxGroup,
            checkbox: Checkbox,
            'x-radio-group': RadioGroup,
            'radio-group': RadioGroup,
            'c-CityPicker': CityPicker,
            'city-picker': CityPicker,
            'area-picker': AreaPicker,
            'x-switch': Switch,
            switch: Switch,
            'x-auto-complete': AutoComplete,
            'auto-complete': AutoComplete,
            'range-input': RangeInput,
        }

        const cityPicker: Ref<HTMLElement | null> = ref(null)

        expose({
            cityPicker,
        })

        const {
            label,
            align,
            beforeText,
            afterText,
            name,
            type,
            cityPickerData,
            cityValidateInfo,
            textBold,
            textValue,
            disabled,
            hideRequiredMark,
            addRequiredMark,
            event,
            labelAlign,
            autoLabelHeight,
            validateInfo,
            attributes,
            valueKey,
            labelKey,
            style,
            unitStyle,
            props: _props,
            afterSlot,
            beforeSlot,
            formSlot,
        } = toRefs(props)

        return () => {
            const Component = widgetMap[type.value]
            const slotRenderContext = {
                item: props,
                formData: injectFormData,
                name: name.value,
                label: label.value,
            }
            const renderSlotValue = (value: string | FormItemSlotRender) =>
                typeof value === 'function' ? value(slotRenderContext) : slots[value]?.()

            return (
                <div
                    class={{
                        [formItemStyle['x-form-item']]: true,
                        [formItemStyle['center']]: align.value === 'center',
                        [formItemStyle['around']]: align.value === 'around',
                    }}
                    style={style.value}
                    id={`form_item_wrap_${name.value}`}
                >
                    <div class={{ [formItemStyle['line']]: !formSlot.value }}>
                        {beforeText.value && (
                            <span class={formItemStyle['text-unit-left']} style={unitStyle.value}>
                                {beforeText.value}
                            </span>
                        )}
                        <div class={formItemStyle.main}>
                            <FormItem
                                label-align={labelAlign.value}
                                class={[
                                    {
                                        hideRequiredMark: hideRequiredMark.value,
                                        addRequiredMark: addRequiredMark.value,
                                        autoLabelHeight: autoLabelHeight.value,
                                        formSlotStyle: formSlot.value,
                                    },
                                ]}
                                name={name.value}
                                label={label.value}
                                rules={rulesRef.value}
                                {...attrs}
                                {...attributes.value}
                                {...validateInfo.value}
                                {...props.selfProps}
                                id={!Component ? 'form_item_' + name.value : undefined}
                            >
                                {beforeSlot.value && renderSlotValue(beforeSlot.value)}
                                {Component ? (
                                    <Component
                                        id={'form_item_' + name.value}
                                        ref={(el: HTMLElement) => {
                                            if (
                                                [
                                                    'c-CityPicker',
                                                    'city-picker',
                                                    'area-picker',
                                                ].includes(type.value)
                                            ) {
                                                cityPicker.value = el
                                            }
                                        }}
                                        props={_props.value}
                                        {..._props.value}
                                        event={event.value || {}}
                                        disabled={disabled.value}
                                        options={innerOptions.value}
                                        label={label.value}
                                        value-key={valueKey.value}
                                        label-key={labelKey.value}
                                        name={getName(name.value)}
                                        form-data={injectFormData}
                                        city-picker-data={cityPickerData.value}
                                        city-validate-info={cityValidateInfo.value}
                                        validate-info={validateInfo.value}
                                        textBold={textBold.value}
                                        textValue={textValue.value}
                                        onClearValidate={name => emit('clearValidate', name)}
                                        onValidateName={name => emit('validateName', name)}
                                        onCityPickerChange={data => emit('cityPickerChange', data)}
                                        _is_x_form_item={true}
                                        {...props.slotProps}
                                    ></Component>
                                ) : (
                                    (formSlot.value && renderSlotValue(formSlot.value)) ||
                                    slots.default?.()
                                )}

                                {afterText.value && (
                                    <span
                                        class={formItemStyle['text-unit-right']}
                                        style={unitStyle.value}
                                    >
                                        {afterText.value}
                                    </span>
                                )}
                                {afterSlot.value && renderSlotValue(afterSlot.value)}
                            </FormItem>
                        </div>
                    </div>
                </div>
            )
        }
    },
})
export default FormItemComponent
