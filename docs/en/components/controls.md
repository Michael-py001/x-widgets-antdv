# Controls

The package root re-exports Ant Design Vue controls with the same component names. Use the upstream control contract first; this package adds a small set of form-aware adapters and keeps the framework's native props available.

## Import from the package root

```ts
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  TimeRangePicker
} from 'x-widgets-antdv'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
```

Deep imports are not a stable API. The complete export list is maintained in [Exported components](/en/components/).

## Control groups

| Group | Exports | Notes |
| --- | --- | --- |
| Data entry | `AutoComplete`, `Cascader`, `Checkbox`, `CheckboxGroup`, `DatePicker`, `Input`, `InputNumber`, `Mentions`, `Radio`, `RadioGroup`, `RangePicker`, `Rate`, `Select`, `Slider`, `Switch`, `Textarea`, `TimePicker`, `TimeRangePicker`, `Upload` | Use the corresponding Ant Design Vue props and events. Form-aware fields can also receive the schema bridge described in [Schema forms](/en/components/forms). |
| Layout | `Anchor`, `Breadcrumb`, `Col`, `Divider`, `Flex`, `Layout`, `Menu`, `PageHeader`, `Row`, `Space`, `Steps`, `Tabs`, `Typography` | Layout and navigation remain framework-native; choose the upstream component when composing a page shell. |
| Feedback and overlay | `Alert`, `Drawer`, `Empty`, `Modal`, `Popconfirm`, `Popover`, `Result`, `Spin`, `Tooltip`, `message`, `notification` | Imperative services are exported as named values; call them from application actions rather than from render functions. |
| Data display | `Badge`, `Calendar`, `Card`, `Carousel`, `Descriptions`, `Image`, `List`, `Progress`, `Statistic`, `Table`, `Tag`, `Timeline`, `Tree`, `TreeSelect` | `Table` is the package wrapper and accepts the documented `TableProps` additions. |
| Utility | `Affix`, `App`, `Avatar`, `ConfigProvider`, `FloatButton`, `QRCode`, `Segmented`, `Skeleton`, `Tour`, `Transfer`, `Watermark` | These exports keep their upstream component model; verify version-specific props against the generated declarations. |

## Native controls

For a native control, write the same template and event shape you would write with Ant Design Vue:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Select } from 'x-widgets-antdv'

const search = ref('')
const status = ref<string>()
const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' }
]
</script>

<template>
  <Input v-model:value="search" placeholder="Search records" allow-clear />
  <Select v-model:value="status" :options="statusOptions" />
  <Button type="primary">Search</Button>
</template>
```

The package does not fetch options or own request state. Keep options, loading state, permissions, and side effects in the host application.

## Interactive example

### Basic usage

Each control is imported from the package root and bound to local state through its own `v-model`. Change any control and the "Live form state" panel updates; "Reset state" returns to the initial values.

<ClientOnly><AntdvControlDemo /></ClientOnly>

### Advanced usage

One field `schema` renders a query form and applies its conditions to a local data table on submit. Try a title keyword, a state, or a minimum rating, then click "Search"; in production, swap the renderer for `SearchForm` (see the schema forms docs).

<ClientOnly><AntdvAdvancedDemo /></ClientOnly>

## Form-aware controls

`Input`, `Select`, `AutoComplete`, `RangePicker`, `TimePicker`, `Cascader`, `Rate`, `Slider`, `Mentions`, `Transfer`, `Upload`, and related fields can be rendered by `CustomFormItem`, `FormPage`, or `SearchForm`. In that mode, the schema owns the field name and the component receives the form bridge internally:

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

The schema types added for full form-control parity are:

| Schema `type` | Alias | Bound value key in `formData` | Native update event |
| --- | --- | --- | --- |
| `cascader` | `x-cascader` | `value` | `update:value` |
| `rate` | `x-rate` | `value` | `update:value` |
| `slider` | `x-slider` | `value` | `update:value` |
| `mentions` | `x-mentions` | `value` | `update:value` |
| `transfer` | `x-transfer` | `targetKeys` | `update:targetKeys` |
| `upload` | `x-upload` | `fileList` | `update:fileList` |
| `segmented` | `x-segmented` | `value` | `update:value` |

The Element-parity aliases `autocomplete`, `date-picker`, `range-picker`, `time-picker`, `time-range-picker`, `checkbox`, `checkbox-group`, `switch`, `tree-select`, `select`, `input`, `textarea`, and `input-number` are also resolved. Do not pass a second `v-model` to a schema-managed field. For field rules, slots, and events, use the [schema forms reference](/en/components/forms).

## Contract boundaries

- A name matching an Ant Design Vue component does not guarantee byte-for-byte behavior; wrapper fields may normalize values or add schema props.
- `Table` adds the package's column and pagination contract; see the [table reference](/en/components/table).
- `message` and `notification` are framework services, not Vue components.
- Public types are generated from the source declarations. If a prop is not in the type or this documentation, do not invent it.
- For an upstream behavior, consult the Ant Design Vue documentation for the exact version installed by the consuming application.
