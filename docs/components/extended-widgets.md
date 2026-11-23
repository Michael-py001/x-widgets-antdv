# 扩展组件

这些组件为 Ant Design Vue 增加了本包级别的交互能力。请从包根目录导入；API 请求与路由相关行为由消费方应用负责。

## FunctionButton

`FunctionButton` 根据配置渲染导出、上传、下载、预览或打印操作。组件只渲染第一个已配置的操作类型；每个实例请配置一种操作。

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
  <FunctionButton :options="options">导出</FunctionButton>
</template>
```

请求函数与 URL 由宿主应用提供。上传使用配置的 `uploadURL` / `uploadVideoURL`、`uploadData` 和 `uploadHeaders`；文件大小限制及扩展名也可通过 `FunctionButtonOptionsType` 配置。相对下载或预览路径可设置 `downloadBaseUrl`；文档预览服务可通过 `previewUrlResolver(url, fileType)` 提供地址。未提供解析器时会直接打开传入的 URL（相对路径则使用 `downloadBaseUrl`），本包不假设第三方预览服务。打印操作需要同时传入 `printAPI` 与宿主应用提供的 `printPageURL`；本包不假设应用路由。`fileList` 支持 `v-model:fileList`。组件会按实际操作派发 `uploadFile`、`success`、`error`、`progress` 和 `uploading` 事件。完整选项请查看导出的类型。

## GoBack

`GoBack` 默认调用 Vue Router 的 `router.back()`，因此需要 Vue Router 4。设置 `native=true` 时改为派发 `goBack` 事件，由宿主应用决定导航行为。默认文字为 `返回上一页`，可用 `text` prop 或默认插槽替换。

```vue
<GoBack text="返回" @go-back="handleBack" />
```

## CustomConfigProvider

`CustomConfigProvider` 是 Ant Design Vue `ConfigProvider` 的包装组件，通过一个 prop 选择语言。`locale` 默认值为 `'zh'`；仅当值严格等于 `'en'` 时使用 Ant Design Vue 的 `en_US`，其他值均使用 `zh_CN`。默认插槽用于放置需要继承该语言设置的应用子树。

```vue
<CustomConfigProvider locale="en">
  <AppContent />
</CustomConfigProvider>
```

## TabPage

`TabPage` 是受控的 Ant Design Vue Tabs 包装组件。通过 `v-model:activeIndex` 绑定当前项，`tabs` 的每项使用 `{ title, slotName, disabled? }`。对应具名插槽提供该页内容。`globalTop` 和 `globalBottom` 插槽会在每个 tab 内容周围渲染。`disabledClick` 可禁用切换。

## DropdownButtonList

通过默认插槽传入操作按钮。最多三个按钮显示在行内；其余按钮收纳到下拉菜单。`gap` 控制间距（默认 `5`）。组件只负责排列传入操作；权限与显示控制由宿主应用负责。

## ConfirmPopup

`ConfirmPopup` 提供带有 `show` / `update:show`、`confirm` 和 `cancel` 事件的弹窗。默认宽度为 500px、隐藏右上角关闭按钮，并且遮罩不可关闭。props 包括 `title`、`width`、`showCancelBtn`、`showConfirmBtn`、`okBtnLoading`、`disabled`、`closable` 和 `showFullScreenIcon`。`title`、`footer` 插槽替换默认区域；默认插槽为正文。

```vue
<ConfirmPopup v-model:show="confirming" title="移除条目？" @confirm="removeItem">
  此操作无法撤销。
</ConfirmPopup>
```

## AreaPicker 与 CityPicker

这两个面向 schema 的控件使用宿主传入的 `cityPickerData` 和 `formData` 渲染地区级联选择。地区数据由宿主提供的请求加载；挂载前调用组件静态方法 `setRigionRequest(config)`，并传入 `request`、`requestIdName`、`fieldNames.label` 和 `fieldNames.value`。回调与数据映射由宿主负责；组件不内置请求服务或后端依赖。

## RangeInput 与 EditInput

- `RangeInput` 包装两个 Ant Design Vue `InputNumber` 并绑定一对值。在 schema 字段中，这对值存储于该字段的 `formData` 键下；独立使用时派发 `update:value` 和 `change`。
- `EditInput` 是可编辑的 `InputNumber`。设置 `editabled=false` 时显示格式化后的只读值；`align` 支持 `left`、`right`、`center`。值使用 `v-model:value`。

Ant Design Vue 继承 props 与事件类型请以包根目录导出清单和生成的类型声明为准。
