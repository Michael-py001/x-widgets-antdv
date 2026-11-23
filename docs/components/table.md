# Table

`Table` wraps Ant Design Vue's table and forwards its upstream table props, events, and slots. It adds display and sizing options; it does not fetch, sort, or page application data on its own.

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

## Wrapper props

| Prop | Default | Purpose |
| --- | --- | --- |
| `striped` | `true` | Enable alternating row styling from the wrapper. |
| `autoSrcollHeight` | `true` | Automatically determine table scroll height. The misspelling is the existing public prop name; keep it exact. |
| `getSrcollHeightOnce` | `false` | Measure scroll height only once. |
| `extraHeight` | `0` | Additional height adjustment for the automatic sizing calculation. |
| `useDefaultStyle` | `false` | Control the wrapper's default style behavior. |
| `emptyText` | `暂无数据` | Empty-state text. |
| `emptyImage` | `''` | Optional empty-state image. |
| `showUpOut` | `false` | Enable the wrapper's tree-row collapse control. |

The wrapper also exposes Ant Design Vue `TableProps`; use those declarations for the upstream column, pagination, selection, event, and slot contracts. `TableProps` is exported from the package root.

## Data flow

Pass rows and columns from the host application. Handle remote sorting, filtering, and pagination in the page/composable, then provide the current page's data and pagination props to `Table`. This package is a presentational component library, not an application data layer.
