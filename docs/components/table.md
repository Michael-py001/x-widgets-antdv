# 表格

`Table` 包装了 Ant Design Vue 的表格，并转发其上游的表格 props、事件与插槽。它增加了显示与尺寸相关的选项；但不会自行请求、排序或分页应用数据。

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-antdv'
import type { TableProps } from 'x-widgets-antdv'

const columns: TableProps['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
]
const rows = [
  { key: 'a1', name: 'Alpha', status: 'Draft' },
  { key: 'b2', name: 'Beta', status: 'Published' },
]
</script>

<template>
  <Table :columns="columns" :data-source="rows" :pagination="false" />
</template>
```

## 包装层 props

| Prop | 默认值 | 用途 |
| --- | --- | --- |
| `striped` | `true` | 由包装层启用斑马纹行样式。 |
| `autoSrcollHeight` | `true` | 自动计算表格滚动高度。该拼写错误是现存公开的 prop 名称，请保持原样。 |
| `getSrcollHeightOnce` | `false` | 仅测量一次滚动高度。 |
| `extraHeight` | `0` | 自动尺寸计算时的额外高度调整。 |
| `useDefaultStyle` | `false` | 控制包装层默认样式行为。 |
| `emptyText` | `暂无数据` | 空状态文案。 |
| `emptyImage` | `''` | 可选的空状态图片。 |
| `showUpOut` | `false` | 启用包装层的树形行收起控件。 |

包装层同时暴露 Ant Design Vue 的 `TableProps`；上游的列、分页、选择、事件与插槽契约请参考相应声明。`TableProps` 从包根目录导出。

## 数据流

行数据与列配置由宿主应用传入。请在页面/composable 中处理远程排序、筛选与分页，再把当前页数据与分页 props 提供给 `Table`。本包是展示型组件库，而非应用数据层。
