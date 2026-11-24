# 跨库兼容性

`x-widgets-antdv` 与 `x-widgets-element-plus` 有着共同目标——可复用的 Vue 控件——但二者基于不同的 UI 框架渲染。它们的源码独立维护，因此概念相通并不意味着存在跨框架的统一产物，也不意味着框架专属选项完全一致。

## 共通概念

两个包都导出 `Input`、`InputNumber`、`RadioGroup`、`CheckboxGroup`、`Textarea`、`CustomForm`、`CustomFormItem`、`FormPage`、`SearchForm`、`ConfirmPopup`、`FormModal`、`Table` 与 `Tag`。迁移前请对比导出的类型；每个包的 `src/components.ts` 才是名称的唯一依据。

| 领域 | Ant Design Vue 包 | Element Plus 包 |
| --- | --- | --- |
| UI peer 依赖 | `ant-design-vue` 4.x | `element-plus` 2.x |
| 全局基础 CSS | Ant Design Vue 重置 CSS + 本包 CSS | Element Plus CSS + 本包 CSS |
| 表单 Schema | `ColumnForFormItemType` 的 `column`；控件种类使用 `el` / `type` | 同为 Schema 优先的设计；类型还支持渲染函数插槽以及字段的 `display` / `required` 行为。 |
| 表单分组 | `FormPage` 与 `FormModal` 消费字段 schema；请核对相应包中组件的包装层 props。 | `FormPage` 在 `formModel: FormModelBlock[]` 中分组字段；`SearchForm` 使用扁平的 `column` 数组。 |
| 表格引擎 | Ant Design Vue 表格的 props/事件/插槽，外加包装层选项。 | Element Plus 标准表格（`Table` 搭配 `TableColumn` 与分页包装组件），另有面向 V2 / 大数据集的 `TableVirtualized`。 |
| 共有表单控件 | `Input`、`InputPassword`、`InputSearch`、`Textarea`、`InputNumber`、`Select`、`TreeSelect`、`RadioGroup`、`Checkbox`、`CheckboxGroup`、`Switch`、`DatePicker`、`RangePicker`、`TimePicker`、`TimeRangePicker`、`AutoComplete`、`Cascader`、`Rate`、`Slider`、`Mentions`、`Transfer`、`Upload`、`Segmented`、`CityPicker`、`AreaPicker`、`RangeInput`、`Text`；Schema `type` 均支持裸名与 `x-` 别名。 | 同名控件（含 `transfer`、`upload`，另有本包独有的 `color-picker`）；autocomplete 导出名为 `Autocomplete`。 |
| 框架专有控件 | 无 `ColorPicker`（`ant-design-vue` 4.x 上游没有该控件，请勿在本包 Schema 中声明）。 | `ColorPicker`（Element Plus 上游提供）。 |
| 其他 | `FunctionButton`、`GoBack`、`TabPage`、`DropdownButtonList`、`AreaPicker`、`CityPicker`。 | `TableVirtualized`、`AreaCascader`、`LoadingProgress`、`Text`，以及 tooltip/confirm 辅助工具。 |


Element Plus 另有 `input-otp`、`input-tag`、`time-select` 表单控件（上游提供，Ant Design Vue 4 无对应控件）；跨库迁移时请核对，不要假设这几个值可互换。

## 迁移清单

1. 替换框架 peer 依赖，并加载目标框架自身的 CSS。
2. 重新核对包根目录导出；名称相似的导出在另一个包中可能并不存在。
3. 对照目标框架重新核对原生 props、事件、插槽、尺寸与分页约定。
4. 用目标包的类型重新验证 `formModel`、`column`、字段的 `el`/`type`、选项与自定义渲染插槽。
5. 在目标框架中重新测试布局与交互控件。CSS 类名与主题 token 不可直接移植。

请勿将某个包起别名当作另一个包使用，勿在一个应用中同时组合两个插件，也不要把共通的 schema 名称视为行为完全一致保证。本页面仅记录已核实的共通概念；对各版本而言，类型声明才是权威依据。
