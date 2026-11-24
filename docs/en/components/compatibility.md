# Cross-library compatibility

`x-widgets-antdv` and `x-widgets-element-plus` share a goal—reusable Vue widgets—but render with different UI frameworks. Their source is maintained separately, so shared concepts do not imply a single cross-framework binary or identical framework-specific options.

## Shared concepts

Both packages export `Input`, `InputNumber`, `RadioGroup`, `CheckboxGroup`, `Textarea`, `CustomForm`, `CustomFormItem`, `FormPage`, `SearchForm`, `ConfirmPopup`, `FormModal`, `Table`, and `Tag`. Compare the exported types before migrating; each package's `src/components.ts` is the source of truth for names.

| Area | Ant Design Vue package | Element Plus package |
| --- | --- | --- |
| UI peer | `ant-design-vue` 4.x | `element-plus` 2.x |
| Global base CSS | Ant Design Vue reset CSS + package CSS | Element Plus CSS + package CSS |
| Form schema | `column` of `ColumnForFormItemType`; widget kinds use `el` / `type` | Same schema-first intent; types also support render-function slots and `display`/`required` field behavior. |
| Form grouping | `FormPage` and `FormModal` consume field schemas; verify the component's wrapper props for the exact package. | `FormPage` groups fields in `formModel: FormModelBlock[]`; `SearchForm` uses a flat `column` array. |
| Table engine | Ant Design Vue Table props/events/slots plus wrapper options. | Element Plus standard table (`Table` with `TableColumn` and pagination wrappers), plus a separate `TableVirtualized` for V2 / large datasets. |
| Shared form controls | `Input`, `InputPassword`, `InputSearch`, `Textarea`, `InputNumber`, `Select`, `TreeSelect`, `RadioGroup`, `Checkbox`, `CheckboxGroup`, `Switch`, `DatePicker`, `RangePicker`, `TimePicker`, `TimeRangePicker`, `AutoComplete`, `Cascader`, `Rate`, `Slider`, `Mentions`, `Transfer`, `Upload`, `CityPicker`, `AreaPicker`, `RangeInput`, `Text`; schema `type` accepts both bare names and `x-` aliases. | The same controls (including `transfer` and `upload`, plus this package's own `color-picker`); autocomplete export is `Autocomplete`. |
| Framework-only control | No `ColorPicker` (`ant-design-vue` 4.x has no upstream equivalent; do not declare `color-picker` in this package's schema). | `ColorPicker` (from Element Plus upstream). |
| Extras | `FunctionButton`, `GoBack`, `TabPage`, `DropdownButtonList`, `AreaPicker`, `CityPicker`. | `TableVirtualized`, `AreaCascader`, `LoadingProgress`, `Text`, and tooltip/confirm helpers. |

## Migration checklist

1. Replace framework peer dependencies and load that framework's own CSS.
2. Recheck package-root exports; similarly named exports may not exist in the other package.
3. Recheck native props, events, slots, sizes, and pagination conventions against the target framework.
4. Revalidate `formModel`, `column`, field `el`/`type`, options, and custom render slots with target package types.
5. Re-test layouts and interactive controls in the target framework. CSS classes and theme tokens are not portable.

Do not alias one package as the other, combine both plugins in one app, or treat shared schema names as a promise of perfect behavioral parity. This page documents only the checked shared concepts; declarations are authoritative for each release.
