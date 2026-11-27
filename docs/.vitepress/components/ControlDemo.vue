<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SearchForm, Table, Tag } from 'x-widgets-antdv'
import type { ColumnForFormItemType, TableProps } from 'x-widgets-antdv'
import CodeBlock from './CodeBlock.vue'
import demoSource from './ControlDemo.vue?raw'
import 'ant-design-vue/dist/reset.css'

/**
 * 基础用法：用一份 ColumnForFormItemType schema 驱动 SearchForm，
 * 字段不各自绑 v-model，而是把值写进同一个 formData。提交后驱动下方结果表。
 * 这是本包 Schema 桥接的核心：字段定义一次，查询与展示共用同一份契约。
 */
const filters = reactive({ projectName: '', department: '', category: null as string | null })

const columns: ColumnForFormItemType[] = [
  { name: 'projectName', label: '项目名称', el: 'input', colspan: 12,
    props: { allowClear: true, placeholder: '输入项目名称' } },
  { name: 'department', label: '所属单位', el: 'input', colspan: 12,
    props: { allowClear: true, placeholder: '输入所属单位' } },
  { name: 'category', label: '项目类型', el: 'select', colspan: 12,
    options: [
      { label: '类型A', value: 'typeA' },
      { label: '类型B', value: 'typeB' },
      { label: '类型C', value: 'typeC' },
    ],
    props: { allowClear: true, placeholder: '全部类型' } },
]

const records = [
  { key: '1', projectName: '示例项目一', department: '示例单位甲', category: 'typeA', status: '已发布' },
  { key: '2', projectName: '示例项目二', department: '示例单位乙', category: 'typeB', status: '草稿' },
  { key: '3', projectName: '示例项目三', department: '示例单位丙', category: 'typeC', status: '已发布' },
  { key: '4', projectName: '示例项目四', department: '示例单位丁', category: 'typeA', status: '已归档' },
]

const resultColumns: TableProps['columns'] = [
  { title: '项目名称', dataIndex: 'projectName', key: 'projectName', width: 210 },
  { title: '所属单位', dataIndex: 'department', key: 'department', width: 185 },
  { title: '类型', dataIndex: 'category', key: 'category', width: 125 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
]

const applied = ref({ ...filters })
const runs = ref(1)
const result = computed(() => records.filter((r) =>
  (!applied.value.projectName || r.projectName.includes(applied.value.projectName)) &&
  (!applied.value.department || r.department.includes(applied.value.department)) &&
  (!applied.value.category || r.category === applied.value.category)
))

function onSearch(values: typeof filters): void {
  applied.value = { ...values }
  runs.value += 1
}
function onReset(values: typeof filters): void {
  applied.value = { ...values }
  runs.value += 1
}
function statusColor(status: string): string {
  return status === '已发布' ? 'green' : status === '草稿' ? 'blue' : 'default'
}
</script>

<template>
  <div class="schema-demo" data-ui>
    <div class="schema-demo__head">
      <span class="tag">基础用法</span>
      <p>字段只写一次 <code>column</code> schema，由 <code>SearchForm</code> 渲染成查询表单；值统一写入 <code>formData</code>。试着填写后点「查询」。</p>
    </div>

    <SearchForm
      :column="columns"
      :form-data="filters"
      :label-col="{ style: { minWidth: '76px' } }"
      @search="onSearch"
      @reset="onReset"
    />

    <div class="result">
      <div class="result__head">
        <strong>查询结果</strong>
        <span>{{ result.length }} 条 · 第 {{ runs }} 次查询</span>
      </div>
      <Table :columns="resultColumns" :data-source="result" :pagination="false" :auto-srcoll-height="false" :scroll="{ x: '100%' }" size="small">
        <template #status="{ text }">
          <Tag :color="statusColor(text)">{{ text }}</Tag>
        </template>
      </Table>
    </div>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.schema-demo { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:16px; }
.schema-demo__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.schema-demo__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.schema-demo__head code { font-size:12px; color:var(--vp-c-text-1); }
.result { padding:16px; background:var(--vp-c-bg); border-radius:8px; }
.result__head { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:10px; }
.result__head strong { font-size:14px; }
.result__head span { font-size:12px; color:var(--vp-c-text-2); }
</style>
