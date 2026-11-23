import { watch, unref, isRef, ref } from 'vue'

export function useFormTools() {
    const cityPickerNames = ['city-picker', 'area-picker']

    // 省市区组件数据
    const cityPickerData = ref({})

    function setDefaultValue(i) {
        const { type, el, rules } = i || {}
        if (type === 'range-input' || el === 'range-input') {
            if (rules && rules.length > 0) {
                const requiredTarget = rules.find(i => i.required !== undefined)
                if (requiredTarget) {
                    if (requiredTarget.validator === undefined) {
                        requiredTarget.validator = (_, value) => {
                            if (
                                Array.isArray(value) &&
                                value.every(item => item !== null && item !== '')
                            ) {
                                return Promise.resolve()
                            }
                            return Promise.reject(requiredTarget.message)
                        }
                    }
                }
            }
        }
        if ((isRef(i.display) && unref(i.display) === undefined) || i.display === undefined) {
            i.display = true
        }
    }

    function checkDisplay(item) {
        const display = unref(item.display)

        if (typeof display === 'function') {
            return display()
        } else {
            return display ?? true
        }
    }

    function isShow(item) {
        const show = unref(item.show)
        if (typeof show === 'function') {
            return show()
        } else if (show === false) {
            return false
        } else {
            return true
        }
    }

    function createSearchFormRules(props) {
        const column = props.column
        column
            .filter(i => !!i)
            .forEach(item => {
                setDefaultValue(item)
                if (item && item.columnGroup && item.columnGroup.length > 0) {
                    column.push(...item.columnGroup)
                }
            })
        try {
            const obj = {}
            Object.keys(column).forEach(key => {
                const value = column[key]
                if (value && cityPickerNames.includes(value.el)) {
                    cityPickerData.value = value.columnGroup
                }
                const rules = value?.rules ?? []
                if (value && value.name) {
                    obj[value.name] = rules
                }
            })
            return obj
        } catch (error) {
            throw new Error(JSON.stringify(error))
        }
    }
    // 生成校验规则
    function createFormPageRules(props) {
        try {
            const column = []
            props.formModel
                .filter(i => !!i)
                .forEach((item, index) => {
                    if (item.disabled !== undefined && props.disabled !== undefined) {
                        /* eslint-disable */
                        console.warn(
                            '[FormPage]:FormPage组件传入的formModel中的disabled属性与组件上的disabled属性不能同时存在',
                        )
                        /* eslint-disable */
                    }
                    if (props.disabled === undefined) {
                        watch(
                            () => item.disabled,
                            (newVal, oldValue) => {
                                if (newVal === undefined) return
                                item.column.forEach(i => {
                                    i.props = i.props || {}
                                    if (i.props.originDisabled === undefined) {
                                        if (i.props.disabled === undefined) {
                                            Reflect.set(i.props, 'originDisabled', !!newVal)
                                        } else {
                                            Reflect.set(
                                                i.props,
                                                'originDisabled',
                                                !!i.props.disabled,
                                            )
                                        }
                                    }
                                    if (i.props.disabled === undefined) {
                                        Reflect.set(i.props, 'disabled', !!newVal)
                                    } else {
                                        if (i.props.originDisabled !== undefined) {
                                            if (newVal !== oldValue) {
                                                Reflect.set(i.props, 'disabled', !!newVal)
                                            } else {
                                                Reflect.set(
                                                    i.props,
                                                    'disabled',
                                                    !!i.props.originDisabled,
                                                )
                                            }
                                        } else {
                                            Reflect.set(i.props, 'disabled', !!newVal)
                                        }
                                    }
                                })
                            },
                            {
                                immediate: true,
                            },
                        )
                    }
                    setDefaultValue(item)
                    let target = item.column || []
                    if (target.length > 0) {
                        target.forEach(i => {
                            setDefaultValue(i)
                            if (i && i.columnGroup && i.columnGroup.length > 0) {
                                column.push(...i.columnGroup)
                            }
                        })
                    }
                    column.push(...target)
                })
            // 处理columnGroup
            let obj = {}
            Object.keys(column).forEach(key => {
                let value = column[key]
                if (value && cityPickerNames.includes(value.el)) {
                    cityPickerData.value = value.columnGroup
                }
                let rules = value?.rules ?? []
                if (value && value.name) {
                    obj[value.name] = rules
                }
            })
            return obj
        } catch (error) {
            throw new Error(JSON.stringify(error))
        }
    }

    /***
     * @description 获取选中的省市区
     * @param {string} name CityPicker的name，不传默认取第一个
     * @param {Array} cityPicker CityPicker数组
     * @returns {string} 选中的省市区
     */
    function getSelectedAddressName(name = '', cityPicker = null) {
        if (!cityPicker) return new Error('cityPicker is required')
        try {
            let target = null,
                result = {}
            if (name) {
                target = cityPicker.find(i => {
                    return i?.cityPicker?.cityPickerName === name
                })
            }
            if (target) {
                result = target.cityPicker.selectedAddressName
            } else {
                result = cityPicker?.[0]?.cityPicker?.selectedAddressName
            }
            let { province, city, area, street } = (result as any) || {}
            if (!province || !city || !area || !street) {
                /* eslint-disable */
                console.warn('[city-picker]:省市区街道信息不完整', result)
                /* eslint-disable */
            }
            return result
        } catch (error) {
            console.log(error)

            throw new Error(JSON.stringify(error))
        }
    }

    return {
        createSearchFormRules,
        createFormPageRules,
        checkDisplay,
        isShow,
        setDefaultValue,
        cityPickerData,
        cityPickerNames,
        getSelectedAddressName,
    }
}
