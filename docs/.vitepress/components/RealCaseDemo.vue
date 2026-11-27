<script setup lang="ts">
/**
 * 真实案例简化：示例管理页（列表查询 + FormModal 录入 + 行内筛选）。
 *
 * 三段 schema 全部简化自通用 composable 的写法：
 * - useGenericSearchForm：colspan 两列查询表单；
 * - useGenericFormModal：详情/编辑共用一套 formModel，用 disabled 切换只读；
 * - useGenericInlineEdit：inline 布局，colspan 不生效，操作按钮走 btnAfter 插槽。
 */
import { computed, h, reactive, ref } from 'vue'
import { SearchForm, FormModal, FormPage, Table, Tag } from 'x-widgets-antdv'
import type { ColumnForFormItemType, FormItemSlotRenderContext, TableProps } from 'x-widgets-antdv'
import CodeBlock from './CodeBlock.vue'
import demoSource from './RealCaseDemo.vue?raw'
import 'ant-design-vue/dist/reset.css'

/** 与 Element 版保持一致的本地区块类型（本包未单独导出 FormModelBlock 类型名）。 */
interface FormBlock {
  title?: string
  column: ColumnForFormItemType[]
}

interface ProjectRow {
  id: number
  projectName: string
  department: string
  location: string
  category: string
  status: string
  spec: string
  enabled: string
  remark: string
}

const categoryOptions = [
  { label: '类型A', value: 'typeA' },
  { label: '类型B', value: 'typeB' },
  { label: '类型C', value: 'typeC' },
]
const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '审核中', value: 'review' },
  { label: '已完成', value: 'done' },
]
const yesNoOptions = [
  { label: '是', value: 'yes' },
  { label: '否', value: 'no' },
]

const labelOf = (options: Array<{ label: string; value: string }>, value: string) =>
  options.find((o) => o.value === value)?.label || '—'
const statusColor = (status: string) =>
  status === 'draft' ? 'green' : status === 'review' ? 'blue' : 'default'

const resultColumns: TableProps['columns'] = [
  { title: '项目名称', dataIndex: 'projectName', key: 'projectName', width: 170 },
  { title: '所属单位', dataIndex: 'department', key: 'department', width: 135 },
  { title: '所在地', dataIndex: 'location', key: 'location', width: 75 },
  { title: '类型', dataIndex: 'category', key: 'category', width: 75 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 75 },
  { title: '操作', key: 'ops', width: 86 },
]

/* ---------- ① 列表查询（来自 useGenericSearchForm） ---------- */
const query = reactive({
  projectName: '', department: '', location: '',
  category: null as string | null, status: null as string | null,
})

const searchColumns: ColumnForFormItemType[] = [
  { el: 'input', label: '项目名称', name: 'projectName', colspan: 12,
    props: { allowClear: true, placeholder: '请输入项目名称' } },
  { el: 'input', label: '所属单位', name: 'department', colspan: 12,
    props: { allowClear: true, placeholder: '请输入所属单位' } },
  { el: 'input', label: '项目所在地', name: 'location', colspan: 12,
    props: { allowClear: true, placeholder: '请输入所在地' } },
  { el: 'select', label: '项目类型', name: 'category', colspan: 12,
    options: categoryOptions,
    props: { allowClear: true, placeholder: '全部类型' } },
  { el: 'select', label: '项目状态', name: 'status', colspan: 12,
    options: statusOptions,
    props: { allowClear: true, placeholder: '全部状态' } },
]

const rows = ref<ProjectRow[]>([
  { id: 1, projectName: '示例项目一', department: '示例单位甲', location: '示例地区一', category: 'typeA', status: 'draft', spec: '示例规格A', enabled: 'yes', remark: '' },
  { id: 2, projectName: '示例项目二', department: '示例单位乙', location: '示例地区二', category: 'typeB', status: 'review', spec: '—', enabled: 'no', remark: '' },
  { id: 3, projectName: '示例项目三', department: '示例单位丙', location: '示例地区三', category: 'typeC', status: 'done', spec: '示例规格B', enabled: 'yes', remark: '' },
])

const applied = reactive({ ...query })
const runCount = ref(0)

function applyQuery() {
  Object.assign(applied, query)
  runCount.value += 1
}
function resetQuery() {
  Object.assign(applied, { projectName: '', department: '', location: '', category: null, status: null })
  runCount.value += 1
}

const filteredRows = computed(() => rows.value.filter((row) => (
  (!applied.projectName || row.projectName.includes(applied.projectName)) &&
  (!applied.department || row.department.includes(applied.department)) &&
  (!applied.location || row.location.includes(applied.location)) &&
  (!applied.category || row.category === applied.category) &&
  (!applied.status || row.status === applied.status)
)))

/* ---------- ② 新增 / 编辑弹窗（来自 useGenericFormModal） ---------- */
type ModalMode = 'create' | 'edit' | 'detail'
const modalVisible = ref(false)
const modalMode = ref<ModalMode>('detail')
const savedMessage = ref('')
const modalTitle = computed(() => (
  modalMode.value === 'create' ? '新增项目' : modalMode.value === 'edit' ? '编辑项目' : '项目详情'
))
/** detail 模式复用同一套 schema，只把整张表单置为只读。 */
const modalDisabled = computed(() => modalMode.value === 'detail')

const emptyForm = () => ({
  projectName: '', department: '', location: '', spec: '',
  category: null as string | null, status: null as string | null,
  enabled: null as string | null, remark: '',
})
const formModel = reactive(emptyForm())

const modalSchema: FormBlock[] = [
  { title: '基本信息', column: [
    { label: '项目名称', type: 'input', name: 'projectName', required: true, colspan: 12,
      props: { placeholder: '请输入项目名称', allowClear: true } },
    { label: '所属单位', type: 'input', name: 'department', required: true, colspan: 12,
      props: { placeholder: '请输入所属单位', allowClear: true } },
    { label: '项目所在地', type: 'input', name: 'location', required: true, colspan: 12,
      props: { placeholder: '请输入项目所在地', allowClear: true } },
    { label: '规格参数', type: 'input', name: 'spec', required: true, colspan: 12,
      props: { placeholder: '示例：示例规格A', allowClear: true } },
    { label: '项目类型', type: 'select', name: 'category', required: true, colspan: 12,
      options: categoryOptions, props: { allowClear: true, placeholder: '请选择项目类型' } },
    { label: '项目状态', type: 'select', name: 'status', required: true, colspan: 12,
      options: statusOptions, props: { allowClear: true, placeholder: '请选择项目状态' } },
    { label: '是否启用', type: 'select', name: 'enabled', required: true, colspan: 12,
      options: yesNoOptions, props: { allowClear: true, placeholder: '请选择是否启用' } },
    { label: '备注', type: 'textarea', name: 'remark', colspan: 24,
      props: { placeholder: '可选填写补充说明', rows: 3 } },
  ] },
]

function openCreate() {
  modalMode.value = 'create'
  Object.assign(formModel, emptyForm())
  modalVisible.value = true
}
function openRow(row: ProjectRow, mode: ModalMode) {
  modalMode.value = mode
  Object.assign(formModel, {
    projectName: row.projectName, department: row.department, location: row.location,
    spec: row.spec, category: row.category, status: row.status,
    enabled: row.enabled, remark: row.remark,
  })
  modalVisible.value = true
}
function onConfirm() {
  const payload = { ...formModel }
  if (modalMode.value === 'create') {
    rows.value.unshift({ id: Date.now(), ...payload })
  } else if (modalMode.value === 'edit') {
    const target = rows.value.find((r) => r.projectName === payload.projectName)
    if (target) Object.assign(target, payload)
  }
  modalVisible.value = false
  savedMessage.value = `${modalTitle.value}已提交：${payload.projectName}`
}

/* ---------- ③ 行内筛选条（来自 useGenericInlineEdit） ---------- */
const inlineFilter = reactive({ systemFilter: null as string | null, matchStatusFilter: null as string | null, basisFilter: '' })
/** inline 布局下 colspan 不生效，所以这里不写 colspan——与原页面注释一致。 */
const inlineColumns: ColumnForFormItemType[] = [
  { type: 'select', label: '分类', name: 'systemFilter',
    options: [
      { label: '类别一', value: 'categoryA' }, { label: '类别二', value: 'categoryB' }, { label: '类别三', value: 'categoryC' },
    ],
    props: { allowClear: true, placeholder: '请选择分类' } },
  { type: 'select', label: '匹配状态', name: 'matchStatusFilter',
    options: [
      { label: '已匹配', value: 'done' }, { label: '待核对', value: 'check' },
    ],
    props: { allowClear: true, placeholder: '请选择匹配状态' } },
  { type: 'input', label: '项目依据', name: 'basisFilter',
    props: { allowClear: true, placeholder: '请输入关键字' } },
]
/** 替代原页面的上传触发器：formSlot 渲染函数拿到 formData/label 上下文。 */
function uploadSlot({ formData: model, label }: FormItemSlotRenderContext) {
  return h('div', {
    class: 'x-upload-pick', tabindex: '0',
    onClick: () => { model.uploadedFileName = '示例清单.xlsx' },
  }, model.uploadedFileName || `点击选择${label}（formSlot 渲染函数）`)
}
const inlineWithUpload: ColumnForFormItemType[] = [
  ...inlineColumns,
  { label: '示例附件', name: 'uploadedFileName', formSlot: uploadSlot },
]
const inlineForm = reactive({ uploadedFileName: '', ...inlineFilter })

/** 用 FormPage 直接演示 inline 布局 + formSlot（原页面用 SearchForm 关掉查询按钮）。 */
const inlineDemoModel: FormBlock[] = [{ column: inlineWithUpload }]
</script>

<template>
  <div class="real-case" data-ui>
    <div class="real-case__head">
      <span class="tag">真实案例简化</span>
      <p>下面三段交互分别简化自通用页面的 composable 写法；<b>字段只写一次 schema</b>，由 <code>SearchForm</code> / <code>FormPage</code> / <code>FormModal</code> 桥接渲染。</p>
    </div>

    <!-- ① 列表查询 -->
    <section class="case-block">
      <h4>① 示例管理 · 列表查询 <small>useGenericSearchForm</small></h4>
      <p class="case-hint">colspan=12 两列；填写后点「查询」，下方表格实时按同一份 formData 过滤。</p>
      <SearchForm :column="searchColumns" :form-data="query" layout="horizontal"
        :label-col="{ style: { minWidth: '90px' } }" :enabled-expand="false"
        @search="applyQuery" @reset="resetQuery" />
      <div class="result-bar">
        <span>{{ filteredRows.length }} 条 · 第 {{ runCount }} 次查询</span>
        <Tag color="success">schema 驱动</Tag>
      </div>
      <Table :columns="resultColumns" :data-source="filteredRows" :pagination="false" :auto-srcoll-height="false" :scroll="{ x: '100%' }" size="small" style="width:100%">
        <template #category="{ text }">{{ labelOf(categoryOptions, text) }}</template>
        <template #status="{ text }">
          <Tag :color="statusColor(text)">{{ labelOf(statusOptions, text) }}</Tag>
        </template>
        <template #ops="{ record }">
          <div class="ops">
            <button type="button" @click="openRow(record, 'detail')">详情</button>
            <button type="button" @click="openRow(record, 'edit')">编辑</button>
          </div>
        </template>
      </Table>
    </section>

    <!-- ② 弹窗表单 -->
    <section class="case-block">
      <h4>② 新增 / 编辑弹窗 <small>useGenericFormModal</small></h4>
      <p class="case-hint">详情、编辑、新增共用同一套 formModel；detail 模式只切换 disabled，不另写只读组件。</p>
      <div class="ops"><button type="button" class="primary" @click="openCreate">+ 新增项目</button></div>
      <p v-if="savedMessage" class="saved">{{ savedMessage }}</p>
      <FormModal v-model:show="modalVisible" :modal-title="modalTitle"
        :form-model="modalSchema" :form-data="formModel" :disabled="modalDisabled"
        layout="horizontal" :label-col="{ style: { minWidth: '96px' } }" modal-width="680px"
        @confirm="onConfirm" />
    </section>

    <!-- ③ 行内筛选条 -->
    <section class="case-block">
      <h4>③ 工作台 · 行内入参 <small>useGenericInlineEdit</small></h4>
      <p class="case-hint">inline 布局下 colspan 不生效，因此 schema 不写 colspan；「示例附件」用 formSlot 渲染函数做成点击上传框。</p>
      <FormPage :key="'inline'" :form-model="inlineDemoModel" :form-data="inlineForm"
        layout="inline" />
      <p class="x-note">当前入参：{{ JSON.stringify(inlineForm) }}</p>
    </section>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.real-case { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 18px; background: var(--vp-c-bg-soft); display: flex; flex-direction: column; gap: 16px; }
.real-case__head { display: flex; align-items: flex-start; gap: 12px; }
.tag { flex: none; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-bg); border-radius: 6px; padding: 4px 8px; }
.real-case__head p { margin: 0; font-size: 13px; color: var(--vp-c-text-2); line-height: 1.5; }
.real-case__head b, .real-case__head code { color: var(--vp-c-text-1); }
.case-block { background: var(--vp-c-bg); border-radius: 8px; padding: 14px; }
.case-block h4 { margin: 0 0 4px; font-size: 14px; color: var(--vp-c-text-1); }
.case-block h4 small { font-weight: 400; font-size: 11px; color: var(--vp-c-text-3); margin-left: 6px; }
.case-hint { margin: 0 0 10px; font-size: 12px; color: var(--vp-c-text-2); line-height: 1.5; }
.result-bar { display: flex; align-items: center; justify-content: space-between; margin: 10px 0 8px; font-size: 12px; color: var(--vp-c-text-2); }
.ops { display: flex; gap: 6px; }
.ops button { font: inherit; font-size: 12px; padding: 4px 9px; border: 1px solid var(--vp-c-brand-1); border-radius: 5px; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; }
.ops button.primary { background: var(--vp-c-brand-1); color: #fff; }
.saved { font-size: 12px; color: var(--vp-c-brand-1); margin: 8px 0 0; }
.x-note { font-size: 12px; color: var(--vp-c-text-2); margin: 10px 0 0; }
/* 详情/编辑弹窗跟随文档明暗模式，避免组件库默认白底刺眼。 */
:deep(.ant-modal-content) { background: var(--vp-c-bg-soft); }
:deep(.ant-modal-header) { background: var(--vp-c-bg-soft); border-bottom-color: var(--vp-c-divider); }
:deep(.ant-modal-title), :deep(.ant-modal-close) { color: var(--vp-c-text-1); }
:deep(.ant-modal-footer) { border-top-color: var(--vp-c-divider); }
/* 弹窗被 Teleport 到 body，脱离了文档的 ConfigProvider，禁用态输入框需单独跟随暗色。 */
:deep(.ant-input-disabled), :deep(.ant-input-number-disabled), :deep(.ant-select-disabled .ant-select-selector) { background: var(--vp-c-bg) !important; color: var(--vp-c-text-1) !important; border-color: var(--vp-c-divider) !important; }
:deep(.ant-input-disabled), :deep(.ant-select-disabled .ant-select-selection-item) { opacity: 0.75; }
:deep(.x-formpage-container-fixed-footer) { background: var(--vp-c-bg-soft); border-top: 1px solid var(--vp-c-divider); }
:deep(.x-upload-pick) { display: inline-flex; align-items: center; min-height: 30px; padding: 4px 12px; border: 1px dashed var(--vp-c-brand-1); border-radius: 6px; color: var(--vp-c-brand-1); cursor: pointer; font-size: 13px; }
</style>
