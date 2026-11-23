# Extended widgets

These components add package-level workflows to Ant Design Vue. Import them from the package root; keep API calls and route-specific behavior in the consuming app.

## FunctionButton

`FunctionButton` renders a configured export, upload, download, preview, or print action. It intentionally renders the first configured action; use one action kind per instance.

```vue
<script setup lang="ts">
import { FunctionButton } from 'x-widgets-antdv'
import type { FunctionButtonOptionsType } from 'x-widgets-antdv'

const options: FunctionButtonOptionsType = {
  exportAPI: () => exportRows(),
  exportParams: () => ({ format: 'csv' }),
  fileName: 'records',
  fileType: 'csv',
}
</script>

<template>
  <FunctionButton :options="options">Export</FunctionButton>
</template>
```

The host supplies request functions and URLs. Uploads use the configured `uploadURL`/`uploadVideoURL`, `uploadData`, and `uploadHeaders`; file limits and accepted extensions can be set in `FunctionButtonOptionsType`. For relative download or preview paths, set `downloadBaseUrl`; for document preview services, provide `previewUrlResolver(url, fileType)`. Without a resolver, preview opens the supplied URL (or resolves a relative path with `downloadBaseUrl`) directly; no third-party viewer is assumed. For print actions, provide both `printAPI` and the host-owned `printPageURL`; the package does not assume an application route. `fileList` supports `v-model:fileList`. The component emits `uploadFile`, `success`, `error`, `progress`, and `uploading` events where applicable. Consult the exported type for the complete options surface.

## GoBack

`GoBack` uses Vue Router's `router.back()` by default and requires Vue Router 4. Set `native` to `true` to emit `goBack` instead, so the host can decide what navigation means. The default label is `返回上一页`; use the `text` prop or default slot to replace it.

```vue
<GoBack text="Back" @go-back="handleBack" />
```

## CustomConfigProvider

`CustomConfigProvider` wraps Ant Design Vue's `ConfigProvider` and selects its locale from one prop. `locale` defaults to `'zh'`; exactly `'en'` selects Ant Design Vue `en_US`, while any other value selects `zh_CN`. The default slot contains the application subtree that should inherit the locale.

```vue
<CustomConfigProvider locale="en">
  <AppContent />
</CustomConfigProvider>
```

## TabPage

`TabPage` is a controlled Ant Design Vue Tabs wrapper. Bind `activeIndex` with `v-model:activeIndex`; each `tabs` item uses `{ title, slotName, disabled? }`. The matching named slot supplies that tab's content. `globalTop` and `globalBottom` render around each tab's content. `disabledClick` disables tab changes.

## DropdownButtonList

Pass action buttons through the default slot. Up to three are shown inline; additional actions are placed in the dropdown. `gap` controls spacing (default `5`). This component only arranges the supplied actions; permissions and visibility remain the host application's responsibility.

## ConfirmPopup

`ConfirmPopup` provides a modal with `show` / `update:show`, `confirm`, and `cancel` events. It defaults to a 500px width, hidden close icon, and non-closable mask. Props include `title`, `width`, `showCancelBtn`, `showConfirmBtn`, `okBtnLoading`, `disabled`, `closable`, and `showFullScreenIcon`. The `title` and `footer` slots replace their default regions; the default slot is the body.

```vue
<ConfirmPopup v-model:show="confirming" title="Remove item?" @confirm="removeItem">
  This action cannot be undone.
</ConfirmPopup>
```

## AreaPicker and CityPicker

These schema-oriented controls render cascading region selects from host-provided `cityPickerData` and `formData`. Their region data is loaded by a host-supplied request; call the component's static `setRigionRequest(config)` before mounting and provide `request`, `requestIdName`, and `fieldNames.label` / `fieldNames.value`. The callback and data mapping are host concerns; there is no bundled service or backend dependency.

## RangeInput and EditInput

- `RangeInput` wraps two Ant Design Vue `InputNumber` controls and binds a pair of values. In a schema field, the pair is stored under that field's `formData` key; standalone use emits `update:value` and `change`.
- `EditInput` is an editable `InputNumber`. Set `editabled=false` to render a formatted read-only value; `align` accepts `left`, `right`, or `center`. Its value uses `v-model:value`.

Use the package-root export catalog and generated declarations for the exact inherited Ant Design Vue props and event types.
