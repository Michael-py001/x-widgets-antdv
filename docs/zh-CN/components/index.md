# 导出的组件

以下名称已对照 `src/components.ts` 核实，是受支持的包根目录入口。请从 `x-widgets-antdv` 导入它们；深层路径导入不属于公开 API。

## Ant Design Vue 控件

本包从 `ant-design-vue` 重新导出这些控件及部分子组件：

`Affix`、`Alert`、`Anchor`、`App`、`AutoComplete`、`Avatar`、`Badge`、`Breadcrumb`、`Button`、`Calendar`、`Card`、`Carousel`、`Cascader`、`Checkbox`、`CheckboxGroup`、`Collapse`、`Col`、`Comment`、`ConfigProvider`、`DatePicker`、`Descriptions`、`DescriptionsItem`、`Divider`、`Drawer`、`Dropdown`、`Empty`、`Flex`、`FloatButton`、`Form`、`FormItem`、`FormItemRest`、`Image`、`ImagePreviewGroup`、`Input`、`InputSearch`、`InputNumber`、`Layout`、`List`、`Menu`、`MenuItem`、`Mentions`、`Modal`、`PageHeader`、`Pagination`、`Popconfirm`、`Popover`、`Progress`、`QRCode`、`Radio`、`RadioButton`、`RadioGroup`、`RangePicker`、`Rate`、`Result`、`Row`、`Segmented`、`Select`、`SelectOption`、`Skeleton`、`Slider`、`Space`、`Spin`、`Statistic`、`Steps`、`Switch`、`TabPane`、`Tabs`、`Tag`、`Textarea`、`TimePicker`、`TimeRangePicker`、`Timeline`、`Tooltip`、`Tour`、`Transfer`、`Tree`、`TreeSelect`、`Typography`、`Upload`、`Watermark`、`message` 与 `notification`。

## 业务控件

`ConfirmPopup`、`CustomConfigProvider`、`CustomForm`、`CustomFormItem`、`FormModal`、`FormPage`、`FunctionButton`、`GoBack`、`DropdownButtonList`、`SearchForm`、`TabPage`、`RangeInput`、`EditInput`、`CityPicker` 与 `AreaPicker`。

`Table` 是 Ant Design Vue 表格的包装组件，其 `TableProps` 类型也会被导出。本包还导出 `ColumnForFormItemType`、`FormBlockSlotRender`、`FormBlockSlotRenderContext`、`FormItemSlotRender`、`FormItemSlotRenderContext`、`SearchFormProps`、`FunctionButtonProps` 与 `FunctionButtonOptionsType`。

Schema 驱动的表单除现有控件与 Element 对齐别名外，还接受 `cascader`、`rate`、`slider`、`mentions`、`transfer`、`upload` 作为 `el` / `type` 值（含 `x-` 别名）。值绑定细节见[表单 Schema](/zh-CN/components/forms)与[基础控件](/zh-CN/components/controls)。

## 包根工具导出

包根目录还导出 `setFormdata(formData, name, value)` 和 `getValue(formData, name)`，用于读写 Schema 字段值，并导出 `FormFieldName` 类型（`string | [string, string]`）。请从 `x-widgets-antdv` 导入；二元素数组形式用于访问一层嵌套属性。

## 常见导入方式

```ts
import {
  Button,
  CustomForm,
  CustomFormItem,
  FormModal,
  FormPage,
  FunctionButton,
  SearchForm,
  Table,
} from 'x-widgets-antdv'
import type { ColumnForFormItemType, SearchFormProps, TableProps } from 'x-widgets-antdv'
```

## 名称的含义

与 Ant Design Vue 控件同名的组件，并不保证是逐字节相同的别名：诸如 `Input`、`Select`、`AutoComplete`、`RangePicker`、`TimePicker`、`Cascader`、`Rate`、`Slider`、`Mentions`、`Transfer` 与 `Upload` 这类支持表单的包装组件会把值桥接到 `CustomFormItem`，并可能添加本包特有的 props。上游行为请参考 Ant Design Vue 官方文档，包装层扩展请参考本库带类型的导出。特别地，`single` / `multiple-enhance` 这类自定义 `Select` 模式是包装层的约定，并非 Ant Design Vue 的模式。

自定义 API 契约详见[基础控件](/zh-CN/components/controls)、[表单 Schema](/zh-CN/components/forms)、[表格](/zh-CN/components/table)与[跨库兼容性](/zh-CN/components/compatibility)。
