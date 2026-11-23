import { ref, reactive, watch, unref, Ref } from 'vue'
import type {
    CityPickerData,
    RegionRequestConfig,
    onCityPickerChangeType,
    innerFormDataType,
} from '../types/props'
import { ref as vueRef } from 'vue'

interface LevelState {
    list: Ref<any[]>
    selected: any
    loading: boolean
}

interface LevelConfig {
    name: string
    label?: string
    display?: boolean
    handleOptions?: (data: any) => any
}
interface SelectedAddressName {
    province: Record<string, any>
    city: Record<string, any>
    area: Record<string, any>
    street: Record<string, any>
    village: Record<string, any>
}

const regionRequestConfigRef = vueRef<RegionRequestConfig>({})

/**
 * useCityPicker - 省市区街道联动逻辑hook
 * @param levelConfig 省市区街道联动配置
 * @param emit 组件emit
 * @param regionRequestConfig 地区请求配置
 */
export function useCityPicker(
    levelConfig: CityPickerData[],
    emit: (event: string, ...args: any[]) => void,
    regionRequestConfig: RegionRequestConfig,
): {
    cityColumnNames: Ref<Record<string, string>>
    selectedAddressName: Record<string, any>
    addressCache: Map<string, any[]>
    getAddressData: (
        parentId: any,
        level: number,
        innerFormData: innerFormDataType,
        idx: number,
    ) => Promise<any[]>
    handleAddress: (
        level: number,
        data: any[],
        innerFormData: innerFormDataType,
        idx: number,
    ) => void
    setupLevelWatch: (
        innerFormData: innerFormDataType,
        onCityPickerChange: onCityPickerChangeType,
    ) => void
    checkDisplay: (item: any) => boolean
    initCityPicker: (
        innerFormData: innerFormDataType,
        onCityPickerChange: onCityPickerChangeType,
    ) => void
    fieldNames: Record<string, string>
    state: Record<string, LevelState>
    getSelectedAddress: () => Record<string, any>
    LEVEL_CONFIG: LevelConfig[] | CityPickerData[]
} {
    // picker名字
    const defaultLevelConfig: LevelConfig[] = [
        { name: 'province', label: '省' },
        { name: 'city', label: '市' },
        { name: 'area', label: '区' },
        { name: 'street', label: '街道' },
        { name: 'village', label: '村' },
    ]
    const LEVEL_CONFIG: LevelConfig[] | CityPickerData[] =
        levelConfig && levelConfig.length > 0 ? levelConfig : defaultLevelConfig

    type LevelName = (typeof LEVEL_CONFIG)[number]['name']

    // 用来设置placeholder
    const cityColumnNames = ref<Record<string, string>>({})
    const defaultLabels = defaultLevelConfig.map(i => i.label)
    LEVEL_CONFIG.forEach((level, idx) => {
        const name = (level as LevelConfig).name
        const label = (level as LevelConfig).label
        cityColumnNames.value[name] = label || defaultLabels[idx] || name
    })
    // 缓存 key 类型
    const addressCache: Map<string, any[]> = new Map()

    const selectedAddressName: SelectedAddressName = reactive({
        province: {},
        city: {},
        area: {},
        street: {},
        village: {},
    })
    const addressKeys: (keyof SelectedAddressName)[] = Object.keys(
        selectedAddressName,
    ) as (keyof SelectedAddressName)[]
    function setSelectedAddressName(target: Record<string, any>, idx: number) {
        const key = addressKeys[idx]
        if (key) {
            selectedAddressName[key] = target
        }
    }

    const {
        request,
        requestIdName,
        fieldNames = {
            label: 'label',
            value: 'value',
        },
        handleRegionData = (data: any) => data,
        handleParams = (params: any) => params,
    } = (regionRequestConfigRef.value && Object.keys(regionRequestConfigRef.value).length > 0
        ? (regionRequestConfigRef.value as any)
        : (regionRequestConfig as any)) || {}

    // 统一管理所有级别的状态（动态生成）
    const addressState: Record<string, LevelState> = {}
    LEVEL_CONFIG.forEach(level => {
        addressState[level.name] = { list: ref([]), selected: null, loading: false }
    })

    // 处理数据到对应级别
    function handleAddress(
        level: number,
        data: any[],
        innerFormData: innerFormDataType,
        idx: number,
    ): void {
        const levelConf = LEVEL_CONFIG[level]
        const levelName = levelConf.name
        // 处理 handleOptions
        let list = data || []
        if (typeof levelConf.handleOptions === 'function') {
            list = levelConf.handleOptions(data)
        }
        addressState[levelName].list.value = list
        // 校验清空 emit
        if (list.length === 0 && emit) {
            emit('clearValidate', levelName)
        }
        if (
            innerFormData &&
            innerFormData.value[levelName] != null &&
            innerFormData.value[levelName] !== ''
        ) {
            setSelectedAddress(levelName, innerFormData.value[levelName] as string, idx)
        } else {
            addressState[levelName].selected = null
        }
    }
    // 缓存 key 工具函数
    function getCacheKey(parentId: string | number, level: number): string {
        return `${parentId}_${level}`
    }
    // 获取地区数据
    async function getAddressData(
        parentId: any,
        level: number,
        innerFormData: innerFormDataType,
        idx: number,
    ): Promise<any[]> {
        if (!request) throw new Error('[CityPicker]:请先配置地区请求接口')
        if (!fieldNames.label || !fieldNames.value)
            throw new Error('[CityPicker]:请先配置fieldNames字段')
        if (!requestIdName) throw new Error('[CityPicker]:请先配置requestIdName')
        // 优化缓存 key
        const cacheKey = getCacheKey(parentId, level)
        const cache = addressCache.get(cacheKey) || null
        if (cache) {
            handleAddress(level, cache, innerFormData, idx)
            return cache as any[]
        }
        let _parentId = parentId
        if (Array.isArray(_parentId)) {
            _parentId = _parentId.join(',')
        }
        const params = {
            [requestIdName]: _parentId,
            ...handleParams({ parentId: _parentId, level }),
        }
        try {
            const res = await request(params)
            if (!res || typeof res !== 'object') {
                throw new Error('[CityPicker]:地区请求接口无响应或响应格式错误')
            }
            const { code, data: resData, message } = res
            const data = handleRegionData(resData)
            if (code == 200) {
                if (!addressCache.get(cacheKey)) {
                    addressCache.set(cacheKey, data)
                }
                handleAddress(level, data, innerFormData, idx)
                return data as any[]
            } else {
                throw new Error(
                    `[CityPicker]:接口返回错误（code: ${code}）：${message || '接口异常，请联系管理员！'}`,
                )
            }
        } catch (error: any) {
            if (error?.message?.includes('Network')) {
                throw new Error('[CityPicker]:网络异常，请检查您的网络连接')
            } else if (error instanceof Error) {
                throw error
            } else {
                throw new Error(`[CityPicker]:未知错误：${JSON.stringify(error)}`)
            }
        }
    }
    // 循环注册watch监听和状态联动
    function setupLevelWatch(
        innerFormData: innerFormDataType,
        onCityPickerChange: onCityPickerChangeType,
    ) {
        LEVEL_CONFIG.forEach((level, idx) => {
            watch(
                () => innerFormData.value[level.name],
                (nVal: string, oVal) => {
                    if (oVal && nVal !== oVal) {
                        for (let i = idx + 1; i < LEVEL_CONFIG.length; i++) {
                            const nextLevel = LEVEL_CONFIG[i].name
                            const currentValue = innerFormData.value[nextLevel]
                            if (currentValue) {
                                innerFormData.value[nextLevel] = null
                                addressState[nextLevel].selected = null
                            }
                            addressState[nextLevel].list.value = []
                        }
                    }

                    if (!nVal || nVal === '') {
                        addressState[level.name].selected = null
                        onCityPickerChange(getSelectedAddress())
                        return
                    }

                    // 异步获取下一级数据
                    if (idx < LEVEL_CONFIG.length - 1) {
                        const nextLevel = LEVEL_CONFIG[idx + 1].name
                        addressState[nextLevel].loading = true
                        getAddressData(nVal, idx + 1, innerFormData, idx + 1)
                            .then((data: any[]) => {
                                addressState[nextLevel].list.value = data
                            })
                            .finally(() => {
                                addressState[nextLevel].loading = false
                            })
                    }
                    setSelectedAddress(level.name, nVal, idx)
                    onCityPickerChange(getSelectedAddress())
                },
                { immediate: true },
            )
        })
    }
    // setSelectedAddress 参数类型
    function setSelectedAddress(levelName: LevelName, value: string, idx: number) {
        const list = addressState[levelName].list.value
        const target = list.find((item: Record<string, any>) => item[fieldNames.value] == value)
        addressState[levelName].selected = target
        setSelectedAddressName(target, idx)
    }
    /**
     * 获取所有选中项
     */
    function getSelectedAddress() {
        const result: Record<string, any> = {}
        LEVEL_CONFIG.forEach(level => {
            result[level.name] = addressState[level.name].selected
        })
        return result
    }
    // 判断item是否显示
    function checkDisplay(item: any) {
        const display =
            typeof item.display === 'function' || typeof item.display === 'object'
                ? unref(item.display)
                : item.display
        if (typeof display === 'function') {
            return display()
        } else {
            return display ?? true
        }
    }
    // 初始化方法
    function initCityPicker(
        innerFormData: innerFormDataType,
        onCityPickerChange: onCityPickerChangeType,
    ) {
        // 省始化数据加载
        getAddressData(0, 0, innerFormData, 0)
        setupLevelWatch(innerFormData, onCityPickerChange)
    }
    return {
        cityColumnNames,
        selectedAddressName,
        addressCache,
        getAddressData,
        handleAddress,
        setupLevelWatch,
        checkDisplay,
        initCityPicker,
        fieldNames,
        state: addressState,
        getSelectedAddress,
        LEVEL_CONFIG,
    }
}

export type UseCityPickerReturn = ReturnType<typeof useCityPicker>

export function setRigionRequest(config: RegionRequestConfig) {
    regionRequestConfigRef.value = config
}
