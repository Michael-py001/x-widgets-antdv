# 表单 Schema

表单控件通过 `column` / `formModel` 接收字段配置，并将每个字段绑定到共享的 `formData` 对象。每个 schema 条目通过 `el`（或兼容的 `type`）选择控件；受支持的字段 props 与自定义插槽由导出的 `ColumnForFormItemType` 描述。

## SearchForm

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { SearchForm } from 'x-widgets-antdv'
import type { ColumnForFormItemType } from 'x-widgets-antdv'

const filters = reactive({ title: '', state: undefined as string | undefined })
const columns: ColumnForFormItemType[] = [
  { name: 'title', label: 'Title', el: 'input', props: { allowClear: true } },
  {
    name: 'state', label: 'State', el: 'select',
    options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }],
  },
]

function search(values: typeof filters) {
  // Forward values to the page's list query.
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

### SearchForm props

| Prop | 类型 / 默认值 | 用途 |
| --- | --- | --- |
| `column` | `ColumnForFormItemType[]`，`[]` | 字段 schema 数组。 |
| `formData` | object，必填 | 绑定的值。字段的变更会反映到该对象中。 |
| `layout` | string，`inline` | Ant Design Vue 表单布局。 |
| `gutter` | array，`[12, 12]` | 行/列间距。 |
| `disabled` | boolean，`false` | 禁用字段，除非字段自身提供了取值。 |
| `enabledExpand` | boolean，`true` | 启用自动折叠/展开行为。 |
| `showButtons` | boolean，`true` | 渲染内置的重置/搜索控件。 |
| `resetText`、`searchText` | string | 按钮文案；空字符串会隐藏对应按钮。 |
| `loading` | boolean，`false` | 禁用内置按钮并显示加载状态。 |

触发 `search(values)`、`reset(values)` 与 `expand(isExpanded)` 事件。暴露 `handleReset`、`handleSearch`、`validate`、`clearValidate`、`resetFields`、`formRef` 与 `getSelectedAddressName`。

## CustomFormItem 字段 schema

| 字段 | 用途 |
| --- | --- |
| `name` | `formData` 中的键或键路径。 |
| `label` | 字段的可见标签。 |
| `el` / `type` | 由 FormItem widget map 选择控件。常用值包括 `text`、`select`、`textarea`、`input-number`、`input`、`time-picker`、`date-picker`、`time-range-picker`、`checkbox-group`、`radio-group`、`city-picker`、`tree-select`、`input-password`、`input-search`、`range-picker`、`checkbox`、`switch`、`auto-complete`、`area-picker` 和 `range-input`；仍接受旧 schema 中的 `x-` 别名。 |
| `props` | 转发给所选输入控件的 props。 |
| `options` | 下拉/单选/复选项；选项对象通常包含 `label` 与 `value`。 |
| `rules` | Ant Design Vue 校验规则。 |
| `event` | 控件事件处理器，例如 `onChange`。 |
| `selfProps` | 转发给 Ant Design Vue `Form.Item` 的 props。 |
| `slotProps` | 转发给条目内部输入控件的 props。 |
| `beforeSlot`、`afterSlot`、`formSlot` | 父组件插槽名，或返回 Vue `VNodeChild` 的渲染回调；回调接收 `{ item, formData, name, label }`。 |
| `disabled`、`hideRequiredMark`、`addRequiredMark` | 单个字段的禁用 / 必填标记行为。 |
| `beforeText`、`afterText`、`textValue`、`unitStyle` | 显示文本与布局辅助项。 |

真正自定义的 UI 才使用插槽；普通字段使用 schema 选项与控件 props 即可。若要查看完整的 TS 接口，请导入 `ColumnForFormItemType`，让 TypeScript 校验每个字段。

## FormPage

`FormPage` 渲染分组的表单区块。一个区块包含 `title`、`display`、`style`、`class`、`fieldsetStyle` 与 `column`，其中每个字段使用上述 schema。`formData` 由宿主提供并持有。

| Prop | 默认值 | 用途 |
| --- | --- | --- |
| `formModel`、`formData` | `[]`、`{}` | 区块 schema 与绑定的值。 |
| `layout` | `horizontal` | Ant Design Vue 表单布局。 |
| `labelCol`、`wrapperCol` | `{ style: { minWidth: '100px' } }`、`{ span: 17 }` | 标签与控件的列设置。 |
| `labelAlign` | `left` | 标签对齐方式。 |
| `gutter` | `[12, 0]` | 行间距。 |
| `colspan` | `24` | 字段默认占列数。 |
| `verticalGap` | `0` | 每个字段下方的间距。 |
| `disabled`、`loading` | `undefined`、`false` | 禁用字段或显示加载指示器。 |
| `asChild` | `false` | 嵌入其他布局时使用固有高度。 |
| `extraHeight` | `0` | 计算容器尺寸时预留的视口高度。 |
| `fieldsetStyle` | `{}` | 根 fieldset 样式。 |
| `autocomplete` | `on` | 转发给底层表单。 |

插槽包括 `header`、`footer`、`modelTitle`，以及由 schema 条目的 `slot` / 插槽 props 命名的字段插槽。字段的 `slot` 也可配置返回 `VNodeChild` 的 TSX 渲染回调，参数为 `{ item, formData }`。暴露的方法包括 `validate`、`validateFields`、`clearValidate`、`resetFields`、`scrollToField`、`scrollToFields`、`resetValidate` 与 `getSelectedAddressName`。

## FormModal

```vue
<FormModal
  v-model:show="visible"
  :form-model="formModel"
  :form-data="formData"
  modal-title="Edit record"
  @confirm="save"
/>
```

`confirm` 事件在校验通过后触发，并接收当前表单数据。启用 `autoClose`（默认 `true`）时，取消会重置字段、触发 `update:show(false)` 并触发 `cancel(false)`；当 `autoClose=false` 时，仅触发 `cancel(false)`。`title` 与 `modalFooter` 插槽可自定义弹窗外壳；表单插槽会转发给 `FormPage`。

| Prop | 默认值 | 用途 |
| --- | --- | --- |
| `modalTitle`、`show`、`formModel`、`formData` | `标题`、`false`、`[]`、`{}` | 弹窗标题/可见性与表单输入。 |
| `modalWidth` | `500px` | 弹窗宽度。 |
| `cancelText`、`confirmText` | `取消`、`确认` | 底部按钮文案；空文案会隐藏对应按钮。 |
| `showCancelBtn`、`showConfirmBtn`、`showFooter` | `true` | 控制默认的底部元素。 |
| `okBtnLoading` | `false` | 确认按钮的加载状态。 |
| `autoClose` | `true` | 启用时取消会关闭并重置。 |
| `layout`、`labelAlign` | `horizontal`、`right` | 表单布局与标签对齐方式；`layout` 会传递给 `FormPage` 并实际生效。 |
| `labelCol`、`wrapperCol` | `{ style: { minWidth: '100px' } }`、`{ span: 17 }` | 表单标签与控件的列设置。 |
| `gutter`、`fieldsetStyle`、`showFullScreenIcon`、`autocomplete` | `[12, 0]`、`{}`、`true`、`on` | 转发的表单/弹窗外观设置。 |

暴露的方法包括 `validate`、`validateFields`、`resetFields`、`scrollToField`、`scrollToFields`、`clickConfirm` 与 `clickCancel`（以及内层的 `FormPageRef`）。传入的 `formData` 对象即为数据模型；虽然声明了 `update:formData`，但本组件的模型绑定是只读 getter，因此不要把它当作替换对象事件来依赖。

## 校验与数据归属

`formData` 由宿主持有。请保持对象稳定（例如使用 `reactive`），使表单控件与调用方观察到同一个模型。请在页面边界处理 `search`；本包不请求应用数据，也不实现查询 API。
