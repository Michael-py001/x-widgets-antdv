# Schema forms

The form widgets accept field configuration through `column` / `formModel` and bind each field to a shared `formData` object. Each schema entry uses `el` (or the compatible `type`) to choose a control; supported field props and custom slots are described by the exported `ColumnForFormItemType`.

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

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `column` | `ColumnForFormItemType[]`, `[]` | Field schema array. |
| `formData` | object, required | Bound values. Mutations are reflected into this object. |
| `layout` | string, `inline` | Ant Design Vue form layout. |
| `gutter` | array, `[12, 12]` | Row/column spacing. |
| `disabled` | boolean, `false` | Disable fields unless a field supplies its own value. |
| `enabledExpand` | boolean, `true` | Enable automatic collapse/expand behavior. |
| `showButtons` | boolean, `true` | Render built-in reset/search controls. |
| `resetText`, `searchText` | string | Button labels; an empty string hides that button. |
| `loading` | boolean, `false` | Disable built-in buttons and show loading state. |

Emits `search(values)`, `reset(values)`, and `expand(isExpanded)`. The component exposes `handleReset`, `handleSearch`, `validate`, `clearValidate`, `resetFields`, `formRef`, and `getSelectedAddressName`.

## CustomFormItem field schema

| Field | Purpose |
| --- | --- |
| `name` | Key or key path in `formData`. |
| `label` | Visible field label. |
| `el` / `type` | Control kind selected by the FormItem widget map. Common values include `text`, `select`, `textarea`, `input-number`, `input`, `time-picker`, `date-picker`, `time-range-picker`, `checkbox-group`, `radio-group`, `city-picker`, `tree-select`, `input-password`, `input-search`, `range-picker`, `checkbox`, `switch`, `auto-complete`, `area-picker`, and `range-input`; the `x-` aliases remain accepted for legacy schemas. |
| `props` | Props forwarded to the selected input control. |
| `options` | Select/radio/checkbox choices; option records normally contain `label` and `value`. |
| `rules` | Ant Design Vue validation rules. |
| `event` | Control event handlers, e.g. `onChange`. |
| `selfProps` | Props forwarded to the Ant Design Vue `Form.Item`. |
| `slotProps` | Props forwarded to the input inside the item. |
| `beforeSlot`, `afterSlot`, `formSlot` | Parent slot names or render callbacks returning Vue `VNodeChild`; callbacks receive `{ item, formData, name, label }`. |
| `disabled`, `hideRequiredMark`, `addRequiredMark` | Per-field disabled / required-mark behavior. |
| `beforeText`, `afterText`, `textValue`, `unitStyle` | Display text and layout helpers. |

Use slots for genuinely custom UI; use schema options and control props for ordinary fields. For the complete TS surface, import `ColumnForFormItemType` and let TypeScript validate each field.

## FormPage

`FormPage` renders grouped form sections. A block contains `title`, `display`, `style`, `class`, `fieldsetStyle`, and `column`; each field uses the schema above. The host supplies and owns `formData`.

| Prop | Default | Purpose |
| --- | --- | --- |
| `formModel`, `formData` | `[]`, `{}` | Section schema and bound values. |
| `layout` | `horizontal` | Ant Design Vue form layout. |
| `labelCol`, `wrapperCol` | `{ style: { minWidth: '100px' } }`, `{ span: 17 }` | Label and control column settings. |
| `labelAlign` | `left` | Label alignment. |
| `gutter` | `[12, 0]` | Row spacing. |
| `colspan` | `24` | Default field span. |
| `verticalGap` | `0` | Spacing below each field. |
| `disabled`, `loading` | `undefined`, `false` | Disable fields or show the loading indicator. |
| `asChild` | `false` | Use intrinsic height when embedded in another layout. |
| `extraHeight` | `0` | Reserve viewport height when sizing the container. |
| `fieldsetStyle` | `{}` | Root fieldset styles. |
| `autocomplete` | `on` | Forwarded to the underlying form. |

Slots: `header`, `footer`, `modelTitle`, and field slots named by a schema item's `slot`/slot props. A field's `slot` may also be a TSX render callback returning `VNodeChild` and receiving `{ item, formData }`. Exposed methods include `validate`, `validateFields`, `clearValidate`, `resetFields`, `scrollToField`, `scrollToFields`, `resetValidate`, and `getSelectedAddressName`.

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

The `confirm` event runs after validation and receives the current form data. With `autoClose` (default `true`), cancel resets the fields, emits `update:show(false)`, and emits `cancel(false)`; with `autoClose=false`, it only emits `cancel(false)`. `title` and `modalFooter` slots customize the dialog shell; form slots are forwarded to `FormPage`.

| Prop | Default | Purpose |
| --- | --- | --- |
| `modalTitle`, `show`, `formModel`, `formData` | `标题`, `false`, `[]`, `{}` | Dialog title/visibility and form inputs. |
| `modalWidth` | `500px` | Dialog width. |
| `cancelText`, `confirmText` | `取消`, `确认` | Footer labels; an empty label hides its button. |
| `showCancelBtn`, `showConfirmBtn`, `showFooter` | `true` | Control default footer elements. |
| `okBtnLoading` | `false` | Loading state for confirmation. |
| `autoClose` | `true` | Close and reset on cancel when enabled. |
| `layout`, `labelAlign` | `horizontal`, `right` | Form layout and label alignment. |
| `labelCol`, `wrapperCol` | `{ style: { minWidth: '100px' } }`, `{ span: 17 }` | Form label and control columns. |
| `gutter`, `fieldsetStyle`, `showFullScreenIcon`, `autocomplete` | `[12, 0]`, `{}`, `true`, `on` | Forwarded form/dialog presentation settings. |

Exposed methods include `validate`, `validateFields`, `resetFields`, `scrollToField`, `scrollToFields`, `clickConfirm`, and `clickCancel` (plus the nested `FormPageRef`). The supplied `formData` object is the model; although `update:formData` is declared, this component's model binding is getter-only, so do not rely on it as a replacement-object event.

## Validation and ownership

The host owns `formData`. Keep the object stable (for example, `reactive`) so the form controls and the caller observe the same model. Handle `search` at the page boundary; this package does not fetch application data or implement a query API.
