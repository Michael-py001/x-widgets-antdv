/**
 * @description: 省市区选择器
 * @author: WuShiLi
 */

import { defineComponent, ref, computed, onMounted } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import Space from '../../../../antdv/Space'
import FormItem from '../../FormItem'
import Select from '../../../../antdv/Select/BasicSelect'
import SelectOption from '../../../../antdv/Select/BasicSelectOption'
import type { CityPickerProps, RegionRequestConfig, CityPickerType } from './types/props'
import { cityPickerProps } from './types/props'
import './style/cityPicker.less'
import { useCityPicker, setRigionRequest } from './composables/useCityPicker'

const regionRequestConfig: Ref<RegionRequestConfig> = ref({})
const CityPicker = defineComponent({
    name: 'CityPicker',
    props: cityPickerProps(),
    emits: ['clearValidate', 'update:formData'],
    setRigionRequest(config: RegionRequestConfig): void {
        setRigionRequest(config)
    },
    setup(props: CityPickerProps, { emit, expose }) {
        const { onCityPickerChange } = props
        // 内部表单数据
        const innerFormData: ComputedRef<Record<string, string | number | null>> = computed({
            get: () => props.formData,
            set: val => emit('update:formData', val),
        })
        const {
            cityColumnNames,
            selectedAddressName,
            checkDisplay,
            initCityPicker,
            fieldNames,
            state,
            getSelectedAddress,
        } = useCityPicker(props.cityPickerData, emit, regionRequestConfig.value)
        // 初始化
        onMounted(() => {
            initCityPicker(innerFormData, onCityPickerChange)
        })
        // 对外暴露的数据
        expose({
            selectedAddressName,
            cityPickerName: props.cityPickerName,
            getSelectedAddress,
        })
        return () => (
            <div class="CityPicker">
                <Space style="text-align: left">
                    {props.cityPickerData.map((item, index) => {
                        if (!checkDisplay(item)) return null
                        return (
                            <FormItem
                                name={item.name}
                                label={item.label}
                                {...props.cityValidateInfo[item.name]}
                            >
                                <Select
                                    key={index}
                                    v-model={[innerFormData.value[item.name], 'value']}
                                    placeholder={`请选择${cityColumnNames.value[item.name] || ''}`}
                                    style={{
                                        width: 'fit-content',
                                        minWidth: '100px',
                                        ...item?.props?.style,
                                    }}
                                    {...item.event}
                                    {...item.props}
                                    disabled={item.props?.disabled}
                                >
                                    {state[item.name]?.list?.value?.map((i, idx) => (
                                        <SelectOption key={idx} value={i[fieldNames.value]}>
                                            {i[fieldNames.label]}
                                        </SelectOption>
                                    ))}
                                </Select>
                            </FormItem>
                        )
                    })}
                </Space>
            </div>
        )
    },
}) as unknown as CityPickerType

export default CityPicker
