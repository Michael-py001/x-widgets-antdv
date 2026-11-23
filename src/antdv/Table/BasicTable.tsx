import { defineComponent, ref, unref, toRefs, watch, nextTick, onMounted } from 'vue'
import { Table } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import style from './styles/table.module.less'
import { tableProps } from './types/props'
import default_empty_icon from './images/default_empty_icon.svg'
import { getUID } from '../../utils/widgetHelpers'
import type { XTableProps } from './types/props'
import { antdvVersion } from '../../config'

const userSetEmptyImage = ref<string | null>(null)
export const PARAMS_KEY = 'ANTDV_TABLE_PARAMS'

const defaultPagination = {
    pageSize: 50,
    pageSizeOptions: ['30', '50', '100', '500'],
}

let saveHeight: number | string = 145

const propsValue = {
    ...Table.props,
    ...tableProps(),
}

export default defineComponent<XTableProps>({
    name: 'XTable',
    inheritAttrs: true,
    paramsKey: PARAMS_KEY,
    props: propsValue,
    setEmptyImage: (image: string) => {
        userSetEmptyImage.value = image
    },
    setup(props: XTableProps, { attrs, slots, expose }) {
        const defaultKey = 'index'
        const { scroll, autoSrcollHeight, rowSelection, getSrcollHeightOnce, showUpOut } = props
        const { dataSource, rowKey, columns, emptyText } = toRefs(props)
        const newDataSource = ref(null)
        const newRowKey = ref('')
        const UID = getUID()

        // Initialize data source and row key
        const initializeDataSource = () => {
            if (Array.isArray(dataSource?.value) && dataSource?.value.length > 0) {
                if (typeof rowKey.value === 'function' && rowKey.value.length === 2) {
                    newDataSource.value = cloneDeep(dataSource.value)
                    unref(newDataSource).forEach((item: any, index: number) => {
                        if (item[defaultKey] === undefined) {
                            item[defaultKey] = index
                        }
                    })
                    newRowKey.value = defaultKey
                }
            }
        }
        initializeDataSource()

        // Process slots
        const processSlots = () => {
            const _slotsMap: Record<string, any> = {}
            const innerSlots = ['title', 'bodyCell', 'footer', 'summary']
            Object.keys(slots).forEach(name => {
                if (!innerSlots.includes(name)) {
                    _slotsMap[name] = slots[name]
                }
            })
            return _slotsMap
        }
        const _slotsMap = processSlots()

        // Empty text component
        const EmptyText = () => (
            <div class={style.empty_text_wrap}>
                <div class={style.empty_icon_wrap}>
                    <img
                        src={userSetEmptyImage.value ?? default_empty_icon}
                        alt={emptyText.value}
                    />
                </div>
                <span class={style.empty_text}>{emptyText.value}</span>
            </div>
        )

        // Scroll to a specific row
        const scrollToLine = (
            id: string,
            behavior: ScrollBehavior = 'smooth',
        ): HTMLElement | void => {
            if (!id) return
            const node = document.querySelector(`#${UID}`)
            const tableBody = node?.querySelector('.ant-table-body')
            const resultTr: HTMLElement | null = tableBody?.querySelector(
                `table tbody tr[data-row-key="${id}"]`,
            )
            if (!resultTr) return

            const top = resultTr.offsetTop || 0
            tableBody.scrollTo({ top, behavior })
            resultTr.style.animationName = style.activeLine_animate
            resultTr.classList.add('activeLine')
            setTimeout(() => {
                resultTr.style.animationName = ''
                resultTr.classList.remove('activeLine')
            }, 2500)
            return resultTr
        }

        // Merge picker rows
        const handlePickerMerge = () => {
            const node = document.querySelector(`#${UID}`)
            if (!node) return
            const tableBody = node.querySelector('.ant-table-body')
            if (!tableBody) return

            const resultTr: NodeListOf<Element> = tableBody.querySelectorAll(
                `table tbody tr[data-row-key]`,
            )
            resultTr.forEach(tr => {
                const td = tr.querySelectorAll('td')
                if (td.length < 2) return

                const firstTd = td[0]
                const secondTd = td[1]
                const trDataRowKey = tr.getAttribute('data-row-key')
                const rowKey = props.rowKey as string
                const secondTdRowspan = secondTd.getAttribute('rowspan') || '0'

                if (dataSource.value.filter(item => item[rowKey] === trDataRowKey).length > 1) {
                    if (secondTdRowspan === '0') {
                        firstTd.style.display = 'none'
                    } else {
                        firstTd.setAttribute('rowspan', secondTdRowspan)
                    }
                }
            })
        }

        // Watch for data source changes
        if (rowSelection) {
            if (!rowSelection.columnWidth) {
                rowSelection.columnWidth = 50
            }

            watch(
                () => dataSource.value,
                val => {
                    if (val?.length === 0) return
                    nextTick(() => {
                        handlePickerMerge()
                    })
                },
                { immediate: true },
            )
        }

        // Calculate table scroll height
        const calculateTableScrollHeight = () => {
            const firstRenderTableHeight = ref<string | null>(null)

            return () => {
                if (getSrcollHeightOnce && firstRenderTableHeight.value) {
                    return firstRenderTableHeight.value
                }
                let extraHeight = props.extraHeight + 80 // Default table top height + bottom margin
                if (props.pagination) {
                    extraHeight += 64 // Pagination height
                }

                const node: HTMLElement | null = document.querySelector(`#${UID}`)
                if (node) {
                    node.style.position = 'relative'
                    saveHeight = `calc(100vh - ${Math.floor(
                        node.getBoundingClientRect().top + extraHeight,
                    )}px)`
                    if (!firstRenderTableHeight.value) {
                        firstRenderTableHeight.value = saveHeight
                    }
                }

                return saveHeight
            }
        }

        const getTableScroll = calculateTableScrollHeight()

        /**
         * 设置顶部和底部同时存在的summary
         * @example
         * <template #summary>
         *      <a-table-summary fixed>
         *          <a-table-summary-row>
         *              <a-table-summary-cell :index="0">bottom</a-table-summary-cell>
         *          </a-table-summary-row>
         *      </a-table-summary>
         *      <a-table-summary>
         *          <a-table-summary-row id="summary-top">
         *              <a-table-summary-cell :index="0">top</a-table-summary-cell>
         *          </a-table-summary-row>
         *      </a-table-summary>
         * </template>
         * @returns
         */
        const handleSummarySlot = () => {
            const node = document.querySelector(`#${UID}`)
            if (!node) return

            const summaryTop = node.querySelector('#summary-top')
            if (!summaryTop) return

            const tableHeader = node.querySelector('.ant-table-container .ant-table-header table')
            if (summaryTop) {
                const tfoot = document.createElement('tfoot')
                tfoot.className = 'ant-table-summary'
                tfoot.appendChild(summaryTop)
                tableHeader?.appendChild?.(tfoot)
            }
        }

        onMounted(() => {
            if (sessionStorage.getItem(PARAMS_KEY)) {
                sessionStorage.removeItem(PARAMS_KEY)
            }
            handleSummarySlot()
        })

        expose({
            scrollToLine,
            getTableScroll,
            pagination: props.pagination,
        })

        return () => {
            let _scroll = scroll
            if (autoSrcollHeight) {
                _scroll = { ...scroll, y: scroll?.y || getTableScroll() }
                // } else {
                //     const node = document.querySelector(`#${UID}`)
                //     if (node && _scroll?.y) {
                //         const tableBody = node?.querySelector('.ant-table-body')
                //         tableBody?.classList.add(style.noscroll)
                //     }
            }
            // Handle pagination state
            let savePagin: any = null
            if (props.pagination && typeof props.pagination !== 'boolean') {
                const { onChange } = props.pagination
                const paginParams = JSON.parse(sessionStorage.getItem(PARAMS_KEY))
                savePagin = { ...defaultPagination, ...props.pagination }

                if (paginParams) {
                    savePagin.current = Number(paginParams.pageIndex)
                    savePagin.pageSize = Number(paginParams.pageSize)
                }

                if (typeof onChange === 'function') {
                    savePagin.onChange = (i: number, s: number) => onChange(i, s)
                }
            }

            // Row class name function
            const rowClassNameFunc = (_record: any, _index: number) => {
                const { rowClassName, striped } = props
                const classes: string[] = []
                if (striped && _index % 2 === 1) {
                    classes.push('table-striped')
                }
                if (typeof rowClassName === 'function') {
                    const customClass = rowClassName(_record, _index, 0)
                    if (customClass) classes.push(customClass)
                }
                return classes.join(' ') || null
            }

            // Process columns for compatibility
            const newColumns = columns?.value?.map((item: any, columIndex: number) => {
                const { customRender } = item?.slots || {}
                if (customRender) {
                    const obj = {
                        ...item,
                        _slots: customRender,
                    }
                    if (antdvVersion > 2) {
                        delete obj.slots
                    }
                    return obj
                }
                //展示收起行的时候 要合并
                if (showUpOut) {
                    const sharedOnCell = (record: any) => {
                        if (record.isUpOut) {
                            return {
                                colSpan: columIndex == 0 ? columns?.value.length : 0,
                                style: {
                                    textAlign: 'center',
                                },
                            }
                        }
                    }
                    item.customCell = item.customCell ?? sharedOnCell
                }

                // item.resizable = true
                // item.width = item.width || 150

                return item
            })

            return (
                <Table
                    {...props}
                    class={`${style.x_table} ${attrs.class}`}
                    id={UID}
                    columns={newColumns}
                    dataSource={newDataSource.value || dataSource?.value || []}
                    rowKey={newRowKey.value || rowKey?.value}
                    bordered
                    locale={{
                        emptyText: <EmptyText />,
                    }}
                    pagination={savePagin ?? false}
                    rowClassName={rowClassNameFunc}
                    scroll={_scroll}
                >
                    {{
                        ...slots,
                        bodyCell: ({ record, column, index }: any) => {
                            return Object.keys(_slotsMap)
                                .map(name => {
                                    if (
                                        column.key === name ||
                                        column._slots === name ||
                                        column.dataIndex === name
                                    ) {
                                        return _slotsMap[name]({
                                            record,
                                            column,
                                            index,
                                            text: record[column.dataIndex],
                                        })
                                    }
                                })
                                .concat(
                                    slots?.bodyCell
                                        ? slots.bodyCell({
                                              record,
                                              column,
                                              index,
                                              text: record[column.dataIndex],
                                          })
                                        : [],
                                )
                        },
                    }}
                </Table>
            )
        }
    },
})
