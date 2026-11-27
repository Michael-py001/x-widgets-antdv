<script setup lang="tsx">
import { h, reactive } from 'vue'
import { FormPage, Tag } from 'x-widgets-antdv'
import type { ColumnForFormItemType } from 'x-widgets-antdv'
import CodeBlock from './CodeBlock.vue'
import demoSource from './SlotDemo.vue?raw'

/** 本包未单独导出 FormModelBlock 类型名，按 schema 结构本地声明。 */
interface FormBlock {
  title?: string
  column: ColumnForFormItemType[]
}

/**
 * 单元格/区块插槽的三种写法对照：
 * 字符串插槽名适合在模板里写标记；h() 适合几行的小渲染函数；TSX 的 <div> 适合结构更丰富的 JSX。
 * 三者共用同一个 formData，改动会实时反映到其他插槽。
 */
const formData = reactive({
  fieldA: '',
  fieldB: '示例项目',
  fieldC: 0,
})

const formModel: FormBlock[] = [
  {
    title: '插槽示例区块',
    column: [
      // A：字符串插槽名 —— 对应模板里的 <template #templateSlot>
      { label: '模板插槽字段', name: 'fieldA', colspan: 24, formSlot: 'templateSlot' },
      // B：h() 渲染函数 —— 用到 label 与当前值
      {
        label: '渲染函数字段', name: 'fieldB', colspan: 24,
        formSlot: ({ formData: model, label }) => h(
          'div',
          { class: 'slot-h' },
          `${label} · 当前值：${model.fieldB || '空'}`,
        ),
      },
      // C：TSX 渲染函数 —— 结构更丰富的 JSX，可交互
      {
        label: 'TSX 字段', name: 'fieldC', colspan: 24,
        formSlot: ({ formData: model }) => (
          <div class="slot-tsx">
            <button
              type="button"
              class="slot-tsx__btn"
              onClick={() => { model.fieldC = (model.fieldC || 0) + 1 }}
            >TSX 点击 +1</button>
            <span class="slot-tsx__val">当前：{model.fieldC || 0}</span>
          </div>
        ),
      },
      // 区块级：渲染函数写法
      {
        slot: ({ formData: model }) => h(
          'div',
          { class: 'slot-block' },
          `h() 区块 · 字段A = ${model.fieldA || '空'}`,
        ),
      },
      // 区块级：字符串插槽名写法 —— 对应模板里的 <template #stringBlockSlot>
      { slot: 'stringBlockSlot' },
    ] as ColumnForFormItemType[],
  },
]
</script>

<template>
  <div class="slot-demo" data-ui>
    <div class="slot-demo__head">
      <span class="tag">插槽演示</span>
      <p>字符串插槽名适合在模板里写标记；<code>h()</code> 适合几行的小渲染函数；TSX 的 <code>&lt;div&gt;</code> 适合结构更丰富的 JSX。三者共用同一个 <code>formData</code>。</p>
    </div>

    <FormPage :form-model="formModel" :form-data="formData">
      <template #header>
        <div class="slot-header">header 插槽 · 下面的字段分别用三种方式渲染</div>
      </template>
      <template #modelTitle="{ title }">
        <div class="slot-model-title">{{ title }} <span>（modelTitle 插槽）</span></div>
      </template>
      <!-- 字段 A：字符串 formSlot 名，模板里写标记并用 v-model 绑定 -->
      <template #templateSlot="{ formData: model }">
        <input v-model="model.fieldA" class="slot-input" placeholder="字符串插槽：请输入" />
      </template>
      <!-- 区块：字符串 slot 名 -->
      <template #stringBlockSlot="{ formData: model }">
        <div class="slot-block slot-block--string">字符串区块插槽 · 字段C = {{ model.fieldC || 0 }}</div>
      </template>
      <template #footer>
        <div class="slot-footer">footer 插槽 · 所有插槽读写同一份 formData</div>
      </template>
    </FormPage>

    <div class="slot-legend">
      <span>本页插槽：</span>
      <Tag color="blue">formSlot 字符串名</Tag>
      <Tag color="blue">formSlot h()</Tag>
      <Tag color="cyan">formSlot TSX</Tag>
      <Tag color="green">block slot h()</Tag>
      <Tag color="green">block 字符串名</Tag>
      <Tag color="orange">header / footer</Tag>
      <Tag color="red">modelTitle</Tag>
    </div>

    <CodeBlock :code="demoSource" />
  </div>
</template>

<style scoped>
.slot-demo { border:1px solid var(--vp-c-divider); border-radius:10px; padding:18px; background:var(--vp-c-bg-soft); display:flex; flex-direction:column; gap:14px; }
.slot-demo__head { display:flex; align-items:flex-start; gap:12px; }
.tag { flex:none; font-size:12px; font-weight:600; color:var(--vp-c-brand-1); background:var(--vp-c-bg); border-radius:6px; padding:4px 8px; }
.slot-demo__head p { margin:0; font-size:13px; color:var(--vp-c-text-2); line-height:1.5; }
.slot-demo__head code { font-size:12px; color:var(--vp-c-text-1); }
.slot-legend { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-top:4px; padding:12px; background:var(--vp-c-bg); border-radius:8px; }
.slot-legend > span { font-size:12px; color:var(--vp-c-text-2); }
:deep(.slot-header) { padding:8px 12px; margin-bottom:12px; border-radius:6px; background:var(--vp-c-bg); font-size:12px; color:var(--vp-c-text-2); border:1px solid var(--vp-c-divider); }
:deep(.slot-model-title) { font-weight:600; font-size:14px; color:var(--vp-c-text-1); margin-bottom:12px; }
:deep(.slot-model-title span) { font-weight:400; font-size:11px; color:var(--vp-c-text-3); }
:deep(.slot-input) { width:100%; box-sizing:border-box; padding:6px 10px; font:inherit; font-size:13px; color:var(--vp-c-text-1); background:var(--vp-c-bg); border:1px solid var(--vp-c-brand-1); border-radius:6px; color-scheme:light dark; }
:deep(.slot-input::placeholder) { color:var(--vp-c-text-3); }
:deep(.slot-h) { font-size:13px; color:var(--vp-c-text-2); padding:4px 0; }
:deep(.slot-tsx) { display:flex; flex-wrap:wrap; align-items:center; gap:10px; }
:deep(.slot-tsx__btn) { font:inherit; font-size:12px; padding:5px 12px; border-radius:6px; border:1px solid var(--vp-c-brand-1); background:transparent; color:var(--vp-c-brand-1); cursor:pointer; }
:deep(.slot-tsx__val) { font-size:13px; color:var(--vp-c-text-2); }
:deep(.slot-block) { padding:12px; background:var(--vp-c-bg); border:1px dashed var(--vp-c-divider); border-radius:6px; font-size:13px; color:var(--vp-c-text-2); }
:deep(.slot-block--string) { border-style:solid; border-color:var(--vp-c-brand-1); color:var(--vp-c-brand-1); }
/* 组件自带 #fff 页脚，在文档暗色模式下改为跟随站点背景。 */
:deep(.x-formpage-container-fixed-footer) { background:var(--vp-c-bg-soft); border-top:1px solid var(--vp-c-divider); }
:deep(.slot-footer) { padding:8px 12px; font-size:12px; color:var(--vp-c-text-3); }
</style>
