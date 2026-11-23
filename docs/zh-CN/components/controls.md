# 基础控件

包根目录会以相同的组件名重新导出 Ant Design Vue 控件。使用时应先遵循上游控件契约；本包只增加少量表单适配能力，并保留框架原生 props。

## 从包根目录导入

```ts
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Table,
  Tag
} from 'x-widgets-antdv'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
```

深层源码路径不属于稳定 API。完整导出清单维护在[导出的组件](/zh-CN/components/)。

## 控件分组

| 分组 | 导出 | 说明 |
| --- | --- | --- |
| 数据录入 | `AutoComplete`、`Cascader`、`Checkbox`、`CheckboxGroup`、`DatePicker`、`Input`、`InputNumber`、`Mentions`、`Radio`、`RadioGroup`、`RangePicker`、`Rate`、`Select`、`Slider`、`Switch`、`Textarea`、`TimePicker`、`TimeRangePicker`、`Upload` | 使用对应的 Ant Design Vue props 与事件；表单适配字段还可使用[表单 Schema](/zh-CN/components/forms)中的桥接契约。 |
| 布局与导航 | `Anchor`、`Breadcrumb`、`Col`、`Divider`、`Flex`、`Layout`、`Menu`、`PageHeader`、`Row`、`Space`、`Steps`、`Tabs`、`Typography` | 保持框架原生行为；组合页面壳层时优先选择上游控件。 |
| 反馈与浮层 | `Alert`、`Drawer`、`Empty`、`Modal`、`Popconfirm`、`Popover`、`Result`、`Spin`、`Tooltip`、`message`、`notification` | 命令式服务以具名值导出，应在页面动作中调用，不要在渲染函数中调用。 |
| 数据展示 | `Badge`、`Calendar`、`Card`、`Carousel`、`Descriptions`、`Image`、`List`、`Progress`、`Statistic`、`Table`、`Tag`、`Timeline`、`Tree`、`TreeSelect` | `Table` 是本包的表格封装，额外能力见文档中的 `TableProps`。 |
| 工具控件 | `Affix`、`App`、`Avatar`、`ConfigProvider`、`FloatButton`、`QRCode`、`Segmented`、`Skeleton`、`Tour`、`Transfer`、`Watermark` | 保持上游控件模型；版本相关 props 请以生成的声明为准。 |

## 原生控件

原生控件的模板和事件写法与 Ant Design Vue 一致：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Select } from 'x-widgets-antdv'

const search = ref('')
const status = ref<string>()
const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' }
]
</script>

<template>
  <Input v-model:value="search" placeholder="Search records" allow-clear />
  <Select v-model:value="status" :options="statusOptions" />
  <Button type="primary">Search</Button>
</template>
```

本包不负责请求选项或维护请求状态。选项、loading、权限和副作用应由宿主应用管理。

## 交互示例

下面的控件使用本地响应式状态；修改关键词或状态并点击应用，即可更新摘要。

<ClientOnly><AntdvControlDemo /></ClientOnly>

## 表单适配控件

`Input`、`Select`、`AutoComplete`、`RangePicker`、`TimePicker` 等字段可以由 `CustomFormItem`、`FormPage` 或 `SearchForm` 渲染。此时字段名由 Schema 管理，组件内部接收表单桥接：

```ts
const columns: ColumnForFormItemType[] = [
  { name: 'keyword', label: 'Keyword', type: 'input' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' }
    ]
  }
]
```

Schema 管理的字段不要再传第二个 `v-model`。字段规则、插槽和事件请查看[表单 Schema 参考](/zh-CN/components/forms)。

## 契约边界

- 与 Ant Design Vue 同名不代表逐字节一致；包装字段可能归一化值或增加 Schema props。
- `Table` 增加本包的列与分页契约，详见[表格参考](/zh-CN/components/table)。
- `message` 和 `notification` 是框架服务，不是 Vue 组件。
- 公共类型从源码声明生成；类型和文档中没有的 prop 不要自行臆造。
- 对于上游行为，请以宿主应用实际安装版本的 Ant Design Vue 文档为准。
