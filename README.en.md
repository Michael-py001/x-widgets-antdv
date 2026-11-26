# x-widgets-antdv

[![CI](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-antdv/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

> [简体中文](./README.md) | English

**x-widgets-antdv** is a Vue 3 component library built on Ant Design Vue 4. It turns the recurring "search → modal edit → detail view → table" flow into a set of schema-driven components: declare a field contract once and reuse it across search bars, form pages, and dialogs, while API requests and business state stay in the host application.

Component names and APIs follow Ant Design Vue wherever possible. Controls that need form integration bridge their values into `CustomFormItem` through wrappers, while preserving upstream props, events, and slots. Beyond the base controls, the package ships business widgets such as `SearchForm`, `FormPage`, `FormModal`, `ConfirmPopup`, `FunctionButton`, `GoBack`, and city/area pickers.

> This package and `x-widgets-element-plus` are separate implementations; their frameworks, style systems, and component behavior are not interchangeable.

## Features

- **One typed entry point**: every component and type is exported from the package root, with ESM and CommonJS builds sharing one declaration set.
- **Schema first**: the `ColumnForFormItemType` field contract spans search and form flows — `el` / `type` selects the control, while `props` / `options` / `rules` and slots describe interaction and validation.
- **Business widgets out of the box**: two-column search forms, grouped form pages, modal forms, confirm dialogs, function buttons, back buttons, `CityPicker` / `AreaPicker`, and more.
- **Flexible layouts and slots**: `horizontal` / `vertical` / `inline` layouts, `colspan` columns, and custom rendering via `formSlot`, `beforeSlot`, `afterSlot`, and block-level `slot`.
- **Agent-ready docs**: bilingual VitePress documentation, `llms.txt`, framework compatibility notes, and a coding-agent skill.

## Requirements

| Dependency | Supported | Notes |
| --- | --- | --- |
| Node.js | 18+ | Host toolchain; a supported active LTS release is recommended. |
| Vue | 3.5+ | Peer dependency. |
| Ant Design Vue | 4.x | Peer dependency; import the reset stylesheet separately. |
| `@ant-design/icons-vue` | 7.x | Peer dependency used by wrapped controls. |
| `vue-router` | 4.x | Peer dependency required by `GoBack`. |

## Quick start

### Install

```sh
npm install x-widgets-antdv vue ant-design-vue @ant-design/icons-vue vue-router
```

Vue and the UI framework packages are peer dependencies and must be installed by the consuming application.

### Global registration

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
import XWidgets from 'x-widgets-antdv'
import App from './App.vue'

createApp(App).use(Antd).use(XWidgets).mount('#app')
```

Import Ant Design Vue's reset stylesheet and this package's stylesheet once in the app entry. The `XWidgets` plugin registers only components that provide an `install` method; named imports are always available.

### Import on demand

```ts
import { Button, SearchForm, Table } from 'x-widgets-antdv'
import type { ColumnForFormItemType, SearchFormProps, TableProps } from 'x-widgets-antdv'
import 'x-widgets-antdv/style.css'
```

## Core usage

### 1. Search form (`SearchForm`)

Fields are declared through `column`; values bind to a host-owned `formData` object (keep the reference stable and mutate it in place):

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
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' }
    ]
  }
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

Common `SearchForm` props: `column`, `formData` (required), `layout` (default `inline`), `gutter`, `colspan`, `disabled`, `loading`, `enabledExpand`, `showButtons`, `resetText`, `searchText`. Events: `search`, `reset`, `expand`.

### 2. Form page and modal (`FormPage` / `FormModal`)

`FormPage` and `FormModal` take a grouped `formModel`. Create / edit / detail views share one schema; detail mode only flips `disabled`:

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
    title: 'General',
    column: [
      {
        name: 'projectName', label: 'Project name', type: 'input', colspan: 12,
        rules: [{ required: true, message: 'Please enter a project name' }]
      },
      {
        name: 'projectType', label: 'Project type', type: 'select', colspan: 12,
        options: [
          { label: 'Gas turbine', value: 'gas' },
          { label: 'Offshore wind', value: 'offshore' }
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
    modal-title="New project"
    :form-model="formModel"
    :form-data="formData"
    layout="horizontal"
    @confirm="onConfirm"
  />
</template>
```

Common `FormModal` props: `modalTitle`, `show` (`v-model:show`), `formModel`, `formData`, `modalWidth`, `layout`, `labelCol`, `wrapperCol`, `gutter`, `autoClose`, `disabled`, `okBtnLoading`. `FormPage` also offers `header`, `footer`, and `modelTitle` slots.

### 3. Table (`Table`)

`Table` wraps Ant Design Vue's Table, forwarding upstream props / events / slots and adding display options such as stripes and auto height; data fetching, sorting, and pagination remain with the host:

```vue
<script setup lang="ts">
import { Table } from 'x-widgets-antdv'
import type { TableProps } from 'x-widgets-antdv'

const columns: TableProps['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', dataIndex: 'status', key: 'status' }
]
const rows = [
  { key: 'a1', name: 'Alpha', status: 'Draft' },
  { key: 'b2', name: 'Beta', status: 'Published' }
]
</script>

<template>
  <Table :columns="columns" :data-source="rows" :pagination="false" />
</template>
```

Wrapper-only props: `striped` (default `true`), `autoSrcollHeight`, `getSrcollHeightOnce`, `extraHeight`, `useDefaultStyle`, `emptyText`, `emptyImage`, `showUpOut`. Note that `autoSrcollHeight` / `getSrcollHeightOnce` are the existing public spellings — use them as-is.

## Documented examples

The showcase components in the online docs compose the capabilities above into interactive, real-world scenarios; their source lives in `docs/.vitepress/components/`:

- **Real cases (`RealCaseDemo.vue`)**
  1. **Project management · list query**: a two-column `SearchForm` declares filters; submitting applies the same `formData` to a results table.
  2. **Create / edit modal**: `FormModal` shares one `formModel` across create, edit, and detail; detail only flips `disabled`.
  3. **Cost workbench · inline inputs**: inline layout with an editable cell rendered as a click-to-upload box via a `formSlot` render function.
- **Advanced usage (`AdvancedDemo.vue`)**: one field contract reused across `multi` (`colspan` two-column), `split` (left/right via `fieldsetStyle`), `inline` (query bar), and `vertical` (label above) layouts, covering `formSlot` (render function and string slot name), `beforeSlot` / `afterSlot` affixes, block-level `slot`, and `header` / `footer` / `modelTitle` container slots.

See the [online docs](https://michael-py001.github.io/x-widgets-antdv/) for the interactive versions, or run `npm run docs:dev` locally.

## Components

### Ant Design Vue controls (re-exported)

- **Data entry**: `AutoComplete`, `Cascader`, `Checkbox`, `CheckboxGroup`, `DatePicker`, `Input`, `InputNumber`, `Mentions`, `Radio`, `RadioGroup`, `RangePicker`, `Rate`, `Select`, `Slider`, `Switch`, `Textarea`, `TimePicker`, `TimeRangePicker`, `Upload`
- **Layout & navigation**: `Anchor`, `Breadcrumb`, `Col`, `Divider`, `Flex`, `Layout`, `Menu`, `PageHeader`, `Row`, `Space`, `Steps`, `Tabs`, `Typography`
- **Feedback & overlay**: `Alert`, `Drawer`, `Empty`, `Modal`, `Popconfirm`, `Popover`, `Result`, `Spin`, `Tooltip`, `message`, `notification`
- **Data display**: `Badge`, `Calendar`, `Card`, `Carousel`, `Descriptions`, `Image`, `List`, `Progress`, `Statistic`, `Table`, `Tag`, `Timeline`, `Tree`, `TreeSelect`
- **Utilities**: `Affix`, `App`, `Avatar`, `ConfigProvider`, `FloatButton`, `QRCode`, `Segmented`, `Skeleton`, `Tour`, `Transfer`, `Watermark`

### Business widgets

`ConfirmPopup`, `CustomConfigProvider`, `CustomForm`, `CustomFormItem`, `FormModal`, `FormPage`, `FunctionButton`, `GoBack`, `DropdownButtonList`, `SearchForm`, `TabPage`, `RangeInput`, `EditInput`, `CityPicker`, `AreaPicker`.

Schema `el` / `type` values include `input`, `textarea`, `input-number`, `select`, `tree-select`, `date-picker`, `range-picker`, `time-picker`, `time-range-picker`, `checkbox`, `checkbox-group`, `radio-group`, `switch`, `rate`, `slider`, `cascader`, `mentions`, `transfer`, `upload`, `city-picker`, `area-picker`, `range-input`, `auto-complete`, with `x-`-prefixed compatibility aliases accepted.

### Utilities

The package root exports `setFormdata(formData, name, value)` and `getValue(formData, name)`, plus the type `FormFieldName` (`string | [string, string]`, where the two-element array accesses one level of nesting).

## Documentation

- 简体中文 (default): https://michael-py001.github.io/x-widgets-antdv/
- English: https://michael-py001.github.io/x-widgets-antdv/en/

Docs source lives in `docs/` — Chinese at the root path, English under `docs/en/`. Run `npm run docs:dev` to view locally and `npm run docs:build` to build the static site. The `Deploy documentation` workflow publishes to GitHub Pages on pushes to `main` and on manual dispatch; Pages must use **GitHub Actions** as its build and deployment source. Repository contributors can also use `.agents/skills/x-widgets-antdv/SKILL.md` with coding agents.

## Development

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

Build artifacts are emitted to `dist/` as ESM, CommonJS, TypeScript declarations, and `style.css`.

## License

MIT. See [LICENSE](./LICENSE).
