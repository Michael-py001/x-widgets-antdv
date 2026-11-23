/**
 * @description: 省市区选择器
 * @author: WuShiLi
 */

import { defineComponent, ref, reactive, computed, watch, onMounted, unref } from 'vue'
import type { Ref } from 'vue'
import Space from '../../../../antdv/Space'
import FormItem from '../../FormItem'
import Select from '../../../../antdv/Select/BasicSelect'
import SelectOption from '../../../../antdv/Select/BasicSelectOption'
import Message from '../../../../antdv/Message'
import type {
    CityPickerProps,
    RegionRequestConfig,
    CityPickerType,
} from './types/props'
import { cityPickerProps } from './types/props'
import './style/cityPicker.less'

const regionRequestConfig: Ref<RegionRequestConfig> = ref({})
const AreaPicker = defineComponent({
    name: 'AreaPicker',
    props: cityPickerProps(),
    emits: ['clearValidate', 'update:formData'],
    setRigionRequest(config: RegionRequestConfig): void {
        regionRequestConfig.value = config
    },
    setup(props: CityPickerProps, { emit, expose }) {
        const { onCityPickerChange } = props
        // 内部表单数据
        const innerFormData = computed({
            get: () => {
                return props.formData
            },
            set: val => {
                emit('update:formData', val)
            },
        })
        // 动态生成 innerCityPickerData
        const innerCityPickerData = ref([])
        const cityGroupNames = reactive({})
        const cityColumnNames = ref({})
        const innerData = reactive({})
        const selectedAddressName = reactive({})

        // 省市区缓存
        const addressCache = new Map()

        // 动态根据配置生成级联项
        function setupCityPickerData() {
            // 预设顺序
            const levelOrder = [
                { key: 'province', label: '省' },
                { key: 'city', label: '市' },
                { key: 'area', label: '区' },
                { key: 'street', label: '街道' },
                { key: 'village', label: '村' },
            ]
            const configList = []
            Object.values(props.cityPickerData).forEach(item => {
                const found = levelOrder.find(l => item.name.toLowerCase().includes(l.key))
                if (found) {
                    configList.push({
                        label: item.label || '',
                        name: item.name,
                        list: ref([]),
                        display: item.display !== undefined ? computed(() => item.display) : true,
                        ...item,
                        _levelKey: found.key,
                    })
                    cityGroupNames[found.key] = item.name
                    cityColumnNames.value[item.name] = found.label
                    innerData[found.key + 'Data'] = []
                    selectedAddressName[found.key] = {}
                }
            })
            // 按预设顺序排序
            configList.sort((a, b) => {
                const aIdx = levelOrder.findIndex(l => l.key === a._levelKey)
                const bIdx = levelOrder.findIndex(l => l.key === b._levelKey)
                return aIdx - bIdx
            })
            innerCityPickerData.value = configList
        }

        // 处理数据填充
        function handleAddress(level, data) {
            const item = innerCityPickerData.value[level]
            if (!item) return
            const handleOptions = item.handleOptions
            innerData[item._levelKey + 'Data'] = data || []
            item.list.value = typeof handleOptions === 'function' ? handleOptions(data) : data || []
            if (data.length === 0) {
                emit('clearValidate', cityGroupNames[item._levelKey])
            }
        }

        // 获取地区数据
        async function getAddressData(parentId, level) {
            // 修复 request、fieldNames、requestIdName 未定义报错
            const {
                request,
                requestIdName,
                fieldNames = {
                    label: '',
                    value: '',
                },
                handleRegionData = data => data,
                handleParams = parmas => parmas,
            } = regionRequestConfig.value || {}
            if (!request) throw new Error('[CityPicker]:请先配置地区请求接口')
            if (!fieldNames.label || !fieldNames.value)
                throw new Error('[CityPicker]:请先配置fieldNames字段')
            if (!requestIdName) throw new Error('[CityPicker]:请先配置requestIdName')
            return new Promise(async (resolve, reject) => {
                try {
                    const cache = addressCache.get(parentId) || null
                    if (cache) {
                        handleAddress(level, cache)
                        resolve(cache)
                        return
                    }
                    // 处理数组情况
                    let _parentId = parentId
                    if (Array.isArray(_parentId)) {
                        _parentId = _parentId.join(',')
                    }

                    const params = {
                        [requestIdName]: _parentId,
                        ...handleParams({ parentId: _parentId, level }),
                    }
                    const res = await request(params)
                    const { code, data: resData, message } = res
                    const data = handleRegionData(resData)
                    if (code == 200) {
                        if (!addressCache.get(parentId)) {
                            addressCache.set(parentId, data)
                        }
                        handleAddress(level, data)
                        resolve(data)
                    } else {
                        Message.error(message || '接口异常，请联系管理员！')
                        reject()
                    }
                } catch (error) {
                    reject(error)
                }
            })
        }
        // 监听级联
        function setupWatches() {
            const levels = innerCityPickerData.value.map(i => i._levelKey)
            // 依次 watch
            levels.forEach((key, idx) => {
                if (idx === 0) return
                watch(
                    () => innerFormData.value[cityGroupNames[levels[idx - 1]]],
                    (nVal, oVal) => {
                        // 清空下级
                        for (let i = idx; i < levels.length; i++) {
                            innerFormData.value[cityGroupNames[levels[i]]] = null
                            innerCityPickerData.value[i].list.value = []
                        }
                        if (!nVal || nVal == '') {
                            selectedAddressName[levels[idx - 1]] = {}
                            for (let i = idx; i < levels.length; i++) {
                                selectedAddressName[levels[i]] = {}
                            }
                            onCityPickerChange(selectedAddressName)
                            return
                        }
                        getAddressData(nVal, idx)
                        // 设置选中
                        const parentId =
                            idx === 1 ? 0 : innerFormData.value[cityGroupNames[levels[idx - 2]]]
                        function setData() {
                            const allList = addressCache.get(parentId)
                            if (!allList) {
                                setTimeout(() => {
                                    setData()
                                }, 1000)
                                return
                            } else {
                                const target = allList?.find(
                                    item =>
                                        item[
                                            regionRequestConfig.value?.fieldNames?.value || 'value'
                                        ] == nVal,
                                )
                                selectedAddressName[levels[idx - 1]] = target
                                onCityPickerChange(selectedAddressName)
                            }
                        }
                        setData()
                    },
                    {
                        immediate: true,
                        deep: true,
                    },
                )
            })
            // 最后一级 watch 选中
            const lastIdx = levels.length - 1
            if (lastIdx > 0) {
                watch(
                    () => innerFormData.value[cityGroupNames[levels[lastIdx]]],
                    nVal => {
                        if (!nVal || nVal == '') {
                            selectedAddressName[levels[lastIdx]] = {}
                            onCityPickerChange(selectedAddressName)
                            return
                        }
                        const parentId =
                            lastIdx === 0
                                ? 0
                                : innerFormData.value[cityGroupNames[levels[lastIdx - 1]]]
                        function setData() {
                            const allList = addressCache.get(parentId)
                            if (!allList) {
                                setTimeout(() => {
                                    setData()
                                }, 1000)
                                return
                            } else {
                                const target = allList?.find(
                                    item =>
                                        item[
                                            regionRequestConfig.value?.fieldNames?.value || 'value'
                                        ] == nVal,
                                )
                                selectedAddressName[levels[lastIdx]] = target
                                onCityPickerChange(selectedAddressName)
                            }
                        }
                        setData()
                    },
                    {
                        immediate: true,
                    },
                )
            }
        }

        // 新增：监听 formData 的变化，自动回显已选项（支持编辑/详情回显）
        watch(
            () => ({ ...props.formData }),
            newVal => {
                // 依次触发每一级的 getAddressData 以保证回显
                const levels = innerCityPickerData.value.map(i => i._levelKey)
                let parentId = 0
                // 依次加载每一级的数据
                const loadLevels = async () => {
                    for (let idx = 0; idx < levels.length; idx++) {
                        const codeKey = cityGroupNames[levels[idx]]
                        const code = newVal[codeKey]
                        if (code) {
                            // 只有前一级有值才加载下一级
                            await getAddressData(parentId, idx)
                            // 设置当前级的值（防止表单未赋值）
                            if (!innerFormData.value[codeKey]) {
                                innerFormData.value[codeKey] = code
                            }
                            parentId = code
                        } else {
                            break
                        }
                    }
                }
                loadLevels()
            },
            { immediate: true, deep: true },
        )

        // 对外暴露的数据
        expose({
            selectedAddressName,
            cityPickerName: props.cityPickerName,
        })

        onMounted(() => {
            setupCityPickerData()
            getAddressData(0, 0)
            setupWatches()
        })

        // 判断item是否显示
        function checkDisplay(item) {
            const display = unref(item.display)
            if (typeof display === 'function') {
                return display()
            } else if (display) {
                return true
            } else {
                return false
            }
        }
        return () => {
            return (
                <div class="CityPicker">
                    <Space style="text-align: left">
                        {innerCityPickerData.value.map((item, index) => {
                            // 只渲染配置中存在的级别（如未配置villageCode则不渲染村）
                            if (!checkDisplay(item)) return null
                            // 获取 fieldNames，避免未定义报错
                            const fieldNames = regionRequestConfig.value?.fieldNames || {
                                label: 'label',
                                value: 'value',
                            }
                            return (
                                <FormItem
                                    name={item.name}
                                    label={item.label}
                                    {...props.cityValidateInfo[item.name]}
                                >
                                    <Select
                                        key={index}
                                        v-model={[innerFormData.value[item.name], 'value']}
                                        placeholder={`请选择${
                                            cityColumnNames.value[item.name] || ''
                                        }`}
                                        style={
                                            item.style || {
                                                width: 'fit-content',
                                                'min-width': '80px',
                                            }
                                        }
                                        {...item.event}
                                        {...item.props}
                                        disabled={item.props?.disabled}
                                    >
                                        {item.list?.value?.map((i, idx) => {
                                            return (
                                                <SelectOption key={idx} value={i[fieldNames.value]}>
                                                    {i[fieldNames.label]}
                                                </SelectOption>
                                            )
                                        })}
                                    </Select>
                                </FormItem>
                            )
                        })}
                    </Space>
                </div>
            )
        }
    },
}) as unknown as CityPickerType

export default AreaPicker
