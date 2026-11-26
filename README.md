# x-widgets-antdv

[![CI](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-antdv/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> 简体中文 | [English](./README.en.md)

**x-widgets-antdv** 是基于 Ant Design Vue 4 的 Vue 3 组件库。它把项目里反复出现的「查询表单 → 弹窗编辑 → 详情展示 → 表格列表」流程沉淀为一套 Schema 驱动的组件：字段契约只声明一次，就能在搜索栏、表单页、弹窗之间复用，而 API 请求与业务状态始终留在宿主应用中。

组件名与 API 尽可能沿用 Ant Design Vue；需要表单集成的控件通过包装层把值桥接到 `CustomFormItem`，同时保留上游组件的 props、事件与插槽。除基础控件外，本包还提供 `SearchForm`、`FormPage`、`FormModal`、`ConfirmPopup`、`FunctionButton`、`GoBack`、城市/地区选择器等业务控件。

> 本包与 `x-widgets-element-plus` 是两套独立实现，框架、样式体系及组件行为均不可互换。

## 特性

- **统一类型入口**：所有组件与类型均从包根目录导出，ESM 与 CommonJS 共享同一份类型声明。
- **Schema 优先**：`ColumnForFormItemType` 字段契约贯穿查询与表单流程，`el` / `type` 选择控件，`props` / `options` / `rules` 与各类插槽描述交互与校验。
- **业务控件开箱即用**：双列查询表单、分组表单页、弹窗表单、确认弹窗、功能按钮、返回按钮、`CityPicker` / `AreaPicker` 等。
- **灵活的布局与插槽**：支持 `horizontal` / `vertical` / `inline` 布局、`colspan` 分栏，以及 `formSlot`、`beforeSlot`、`afterSlot`、块级 `slot` 自定义渲染。
- **面向 Agent 的文档**：双语 VitePress 文档、`llms.txt`、框架兼容性说明与编码 Agent 技能。

## 环境要求

| 依赖 | 支持版本 | 说明 |
| --- | --- | --- |
| Node.js | 18+ | 宿主应用工具链，建议使用受支持的活跃 LTS 版本。 |
| Vue | 3.5+ | peer 依赖。 |
| Ant Design Vue | 4.x | peer 依赖；重置样式表需单独引入。 |
| `@ant-design/icons-vue` | 7.x | 包装控件使用的 peer 依赖。 |
| `vue-router` | 4.x | `GoBack` 所需的 peer 依赖。 |

## 快速上手

### 安装

```sh
npm install x-widgets-antdv vue ant-design-vue @ant-design/icons-vue vue-router
```

Vue 与 UI 框架相关包均为 peer 依赖，需由宿主应用自行安装。

### 全局注册

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
import XWidgets from 'x-widgets-antdv'
import App from './App.vue'

createApp(App).use(Antd).use(XWidgets).mount('#app')
```

在应用入口引入一次 Ant Design Vue 重置样式与本包样式。`XWidgets` 插件只注册带有 `install` 方法的组件；具名导入始终可用。

### 按需引入

```ts
import { Button, SearchForm, Table } from 'x-widgets-antdv'
import type { ColumnForFormItemType, SearchFormProps, TableProps } from 'x-widgets-antdv'
import 'x-widgets-antdv/style.css'
```

## 核心用法

### 1. 查询表单（SearchForm）

字段通过 `column` 声明，值绑定在宿主持有的 `formData` 上（保持对象引用稳定，原地修改）：

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { SearchForm } from 'x-widgets-antdv'
import type { ColumnForFormItemType } from 'x-widgets-antdv'

const filters = reactive({ title: '', state: undefined as string | undefined })
const columns: ColumnForFormItemType[] = [
  { name: 'title', label: '标题', el: 'input', props: { allowClear: true } },
  {
    name: 'state', label: '状态', el: 'select',
    options: [
      { label: '草稿', value: 'draft' },
      { label: '已发布', value: 'published' }
    ]
  }
]

function search(values: typeof filters) {
  // 将 values 交给页面的列表查询
  console.log(values)
}
</script>

<template>
  <SearchForm :column="columns" :form-data="filters" @search="search" />
</template>
```

`SearchForm` 常用 props：`column`、`formData`（必填）、`layout`（默认 `inline`）、`gutter`、`colspan`、`disabled`、`loading`、`enabledExpand`、`showButtons`、`resetText`、`searchText`。事件：`search`、`reset`、`expand`。

### 2. 表单页与弹窗（FormPage / FormModal）

`FormPage`、`FormModal` 使用分组的 `formModel`，新增 / 编辑 / 详情可共用同一份 Schema，详情模式只需切换 `disabled`：

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormModal } from 'x-widgets-antdv'
import type { ColumnForFormItemType } from 'x-widgets-antdv'

type FormBlock = { title: string; column: ColumnForFormItemType[] }

const visible = ref(false)
const formData = reactive({ projectName: '', projectType: '' })
const formModel: FormBlock[] = [
  {
    title: '基本信息',
    column: [
      {
        name: 'projectName', label: '项目名称', type: 'input', colspan: 12,
        rules: [{ required: true, message: '请输入项目名称' }]
      },
      {
        name: 'projectType', label: '项目类型', type: 'select', colspan: 12,
        options: [
          { label: '燃机', value: 'gas' },
          { label: '海风', value: 'offshore' }
        ]
      }
    ]
  }
]

function onConfirm(values: typeof formData) {
  console.log(values)
}
</script>

<template>
  <FormModal
    v-model:show="visible"
    modal-title="新增项目"
    :form-model="formModel"
    :form-data="formData"
    layout="horizontal"
    @confirm="onConfirm"
  />
</template>
```

`FormModal` 常用 props：`modalTitle`、`show`（`v-model:show`）、`formModel`、`formData`、`modalWidth`、`layout`、`labelCol`、`wrapperCol`、`gutter`、`autoClose`、`disabled`、`okBtnLoading`。`FormPage` 另提供 `header`、`footer`、`modelTitle` 等插槽。

### 3. 表格（Table）

`Table` 包装 Ant Design Vue 表格，透传上游 props / 事件 / 插槽，并增加斑马纹、自动高度等展示选项；数据请求、排序与分页仍由宿主处理：

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-antdv'
import type { TableProps } from 'x-widgets-antdv'

const columns: TableProps['columns'] = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' }
]
const rows = [
  { key: 'a1', name: 'Alpha', status: '草稿' },
  { key: 'b2', name: 'Beta', status: '已发布' }
]
</script>

<template>
  <Table :columns="columns" :data-source="rows" :pagination="false" />
</template>
```

包装层新增 props：`striped`（默认 `true`）、`autoSrcollHeight`、`getSrcollHeightOnce`、`extraHeight`、`useDefaultStyle`、`emptyText`、`emptyImage`、`showUpOut`。注意 `autoSrcollHeight` / `getSrcollHeightOnce` 是既有的公开拼写，请照此使用。

## 文档案例

在线文档的展示组件把上面这些能力组合成可直接操作的真实场景，源码位于 `docs/.vitepress/components/`：

- **真实案例（`RealCaseDemo.vue`）**
  1. **项目管理 · 列表查询**：双列 `SearchForm` 声明查询字段，提交后用同一份 `formData` 过滤结果表格。
  2. **新增 / 编辑弹窗**：`FormModal` 中新增、编辑、详情共用一份 `formModel`，详情仅切换 `disabled`。
  3. **测算工作台 · 行内入参**：`inline` 布局下的行内编辑，通过 `formSlot` 渲染函数把字段渲染成点击上传区。
- **进阶用法（`AdvancedDemo.vue`）**：同一套字段契约在 `multi`（`colspan` 两列）、`split`（`fieldsetStyle` 左右分栏）、`inline`（查询栏）、`vertical`（标签在上）四种布局下复用；覆盖 `formSlot`（渲染函数与字符串插槽名）、`beforeSlot` / `afterSlot` 前后缀、块级 `slot`、`header` / `footer` / `modelTitle` 容器插槽。

可直接在[在线文档](https://michael-py001.github.io/x-widgets-antdv/)中查看交互效果，或本地运行 `npm run docs:dev`。

## 组件一览

### Ant Design Vue 控件（重导出）

- **数据录入**：`AutoComplete`、`Cascader`、`Checkbox`、`CheckboxGroup`、`DatePicker`、`Input`、`InputNumber`、`Mentions`、`Radio`、`RadioGroup`、`RangePicker`、`Rate`、`Select`、`Slider`、`Switch`、`Textarea`、`TimePicker`、`TimeRangePicker`、`Upload`
- **布局与导航**：`Anchor`、`Breadcrumb`、`Col`、`Divider`、`Flex`、`Layout`、`Menu`、`PageHeader`、`Row`、`Space`、`Steps`、`Tabs`、`Typography`
- **反馈与浮层**：`Alert`、`Drawer`、`Empty`、`Modal`、`Popconfirm`、`Popover`、`Result`、`Spin`、`Tooltip`、`message`、`notification`
- **数据展示**：`Badge`、`Calendar`、`Card`、`Carousel`、`Descriptions`、`Image`、`List`、`Progress`、`Statistic`、`Table`、`Tag`、`Timeline`、`Tree`、`TreeSelect`
- **工具控件**：`Affix`、`App`、`Avatar`、`ConfigProvider`、`FloatButton`、`QRCode`、`Segmented`、`Skeleton`、`Tour`、`Transfer`、`Watermark`

### 业务控件

`ConfirmPopup`、`CustomConfigProvider`、`CustomForm`、`CustomFormItem`、`FormModal`、`FormPage`、`FunctionButton`、`GoBack`、`DropdownButtonList`、`SearchForm`、`TabPage`、`RangeInput`、`EditInput`、`CityPicker`、`AreaPicker`。

Schema 的 `el` / `type` 支持 `input`、`textarea`、`input-number`、`select`、`tree-select`、`date-picker`、`range-picker`、`time-picker`、`time-range-picker`、`checkbox`、`checkbox-group`、`radio-group`、`switch`、`rate`、`slider`、`cascader`、`mentions`、`transfer`、`upload`、`city-picker`、`area-picker`、`range-input`、`auto-complete` 等，并接受 `x-` 前缀的兼容别名。

### 工具函数

包根目录导出 `setFormdata(formData, name, value)` 与 `getValue(formData, name)`，以及类型 `FormFieldName`（`string | [string, string]`，二元素数组访问一层嵌套属性）。

## 文档

- 中文（默认）：https://michael-py001.github.io/x-widgets-antdv/
- English：https://michael-py001.github.io/x-widgets-antdv/en/

文档源码在 `docs/`，中文位于根路径、英文位于 `docs/en/`。运行 `npm run docs:dev` 本地查看，`npm run docs:build` 构建静态站点。`Deploy documentation` 工作流会在推送到 `main` 及手动触发时发布到 GitHub Pages；Pages 的构建与部署来源需选择 **GitHub Actions**。仓库贡献者可配合 `.agents/skills/x-widgets-antdv/SKILL.md` 使用编码 Agent。

## 开发

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

构建产物输出到 `dist/`，包含 ESM、CommonJS、TypeScript 声明与 `style.css`。

## License

MIT。详见 [LICENSE](./LICENSE)。
