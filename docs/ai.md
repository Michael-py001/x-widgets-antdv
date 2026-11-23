# AI 与编码 Agent 指南

本包为仓库用户提供专项 Agent 技能 `.agents/skills/x-widgets-antdv/SKILL.md`；该文件也会随 npm 包发布，并复制到 VitePress 构建产物的 `/agents/skills/x-widgets-antdv/SKILL.md`。当公开 API 发生变化时，请保持本页面、`llms.txt` 与源码导出列表三者一致。

## 为 Agent 提供正确的上下文

1. 说明宿主应用使用 **Vue 3 + Ant Design Vue 4**。
2. 要求 Agent 使用 `x-widgets-antdv`，而不是 Element Plus 包。
3. 将 Agent 指向本文档以及对应的 `.agents/skills/x-widgets-antdv/SKILL.md`。
4. 要求从包根目录导入，并引入文档规定的框架 CSS 与本包 CSS。
5. 要求 schema 使用 `ColumnForFormItemType`，包装表格使用 `TableProps`，而不是自行臆造 props。
6. 尽可能在宿主应用中用本包的 `npm run typecheck`、`npm test` 与 build 脚本验证生成的示例。

## 上下文文件

- [`/llms.txt`](/llms.txt)：部署后的精简检索索引；源文件为 `docs/public/llms.txt`。
- [导出清单](/components/)：包根目录导出的确切名称。
- [基础控件](/components/controls)：原生控件与表单适配器。
- [表单 Schema](/components/forms)：字段模型与 SearchForm 契约。
- [表格](/components/table)：包装层选项与上游 prop 边界。
- [扩展组件](/components/extended-widgets)：由宿主提供的上传、打印、导航、标签页与地区数据契约。
- [兼容性](/components/compatibility)：相对于 Element Plus 的迁移约束。

## Prompt 模板

> 请用 `x-widgets-antdv` 在我的 Vue 3 + Ant Design Vue 4 应用中构建这个页面。先阅读本包导出的组件清单与对应的技能文件。只使用包根目录的导出与文档中的类型；将 API/数据请求保留在应用侧，把 schema 放入带类型的 `ColumnForFormItemType[]`，引入必需的 Ant Design Vue 与本包样式，并说明你运行了哪些本地检查。不要假设 Element Plus 的 API，也不要臆造未文档化的控件 props。

## API 依据

本文档描述的是包层面的契约，不能替代框架自身的参考文档。对于上游 Ant Design Vue 的 prop 或事件，请查阅其上游类型/文档。对于本包特有的包装层 prop，请查阅对应导出的 TypeScript 类型以及当前版本的源码。发现不一致时请如实报告，而不要静默生成不受支持的 API。
