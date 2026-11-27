---
layout: page
---

# 姊妹库：x-widgets-element-plus

`x-widgets-antdv` 与 `x-widgets-element-plus` 同属一个控件家族：**共享同一套「Schema 优先」的 API 设计**，却面向不同的 UI 框架。前者基于 Ant Design Vue 4，后者基于 Element Plus 2。字段定义一次、由 schema 驱动表单与表格的思路在两边一致；真正渲染出来的组件、样式和框架专属选项则各自独立。

## 该选哪一个

- 已有应用使用 **Ant Design Vue** 技术栈 → 用本包 `x-widgets-antdv`。
- 已有应用使用 **Element Plus** 技术栈 → 用姊妹库 `x-widgets-element-plus`。
- 不要在同一个应用里混用两套插件或样式体系；两者的组件行为与名称**不可互换**，共享的 schema 概念也不代表所有 props、事件或表现完全一致。迁移时请以各自包的声明与文档为准。

## 姊妹库资源

- 文档站点：<https://michael-py001.github.io/x-widgets-element-plus/>
- 安装：`npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue`

想了解两者的共通概念与差异，可读[跨库兼容性](/components/compatibility)。
