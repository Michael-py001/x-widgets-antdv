# Exported components

These names are verified against `src/components.ts` and are the supported package-root entry points. Import them from `x-widgets-antdv`; deep imports are not a public API.

## Ant Design Vue controls

The package re-exports these controls and selected subcomponents from `ant-design-vue`:

`Affix`, `Alert`, `Anchor`, `App`, `AutoComplete`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Calendar`, `Card`, `Carousel`, `Cascader`, `Checkbox`, `CheckboxGroup`, `Collapse`, `Col`, `Comment`, `ConfigProvider`, `DatePicker`, `Descriptions`, `DescriptionsItem`, `Divider`, `Drawer`, `Dropdown`, `Empty`, `Flex`, `FloatButton`, `Form`, `FormItem`, `FormItemRest`, `Image`, `ImagePreviewGroup`, `Input`, `InputSearch`, `InputNumber`, `Layout`, `List`, `Menu`, `MenuItem`, `Mentions`, `Modal`, `PageHeader`, `Pagination`, `Popconfirm`, `Popover`, `Progress`, `QRCode`, `Radio`, `RadioButton`, `RadioGroup`, `RangePicker`, `Rate`, `Result`, `Row`, `Segmented`, `Select`, `SelectOption`, `Skeleton`, `Slider`, `Space`, `Spin`, `Statistic`, `Steps`, `Switch`, `TabPane`, `Tabs`, `Tag`, `Textarea`, `TimePicker`, `TimeRangePicker`, `Timeline`, `Tooltip`, `Tour`, `Transfer`, `Tree`, `TreeSelect`, `Typography`, `Upload`, `Watermark`, `message`, and `notification`.

## Business widgets

`ConfirmPopup`, `CustomConfigProvider`, `CustomForm`, `CustomFormItem`, `FormModal`, `FormPage`, `FunctionButton`, `GoBack`, `DropdownButtonList`, `SearchForm`, `TabPage`, `RangeInput`, `EditInput`, `CityPicker`, and `AreaPicker`.

`Table` is the Ant Design Vue table wrapper. Its `TableProps` type is also exported. The package also exports `ColumnForFormItemType`, `FormBlockSlotRender`, `FormBlockSlotRenderContext`, `FormItemSlotRender`, `FormItemSlotRenderContext`, `SearchFormProps`, `FunctionButtonProps`, and `FunctionButtonOptionsType`.

## Root utility exports

The package root also exports `setFormdata(formData, name, value)` and `getValue(formData, name)` for reading and writing schema-bound values, plus the `FormFieldName` type (`string | [string, string]`). These are exported from `x-widgets-antdv`; the two-element form targets a nested property one level deep.

## Common import pattern

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

## What the name means

A name matching an Ant Design Vue control is not guaranteed to be a byte-for-byte alias: form-aware wrappers such as `Input`, `Select`, `AutoComplete`, `RangePicker`, and `TimePicker` bridge values into `CustomFormItem` and may add package-specific props. Use upstream Ant Design Vue documentation for upstream behavior and this library's typed exports for wrapper extensions. In particular, custom `Select` modes such as `single` / `multiple-enhance` are wrapper conventions, not Ant Design Vue modes.

See [controls](/components/controls), [schema forms](/components/forms), [table](/components/table), and [cross-library compatibility](/components/compatibility) for the custom API contracts.
