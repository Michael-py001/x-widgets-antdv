---
layout: home
hero:
  name: x-widgets-antdv
  text: Vue 3 控件
  tagline: 基于 Ant Design Vue 4 的类型化 Schema 控件，覆盖表单、表格与工作流。
  image:
    src: /logo.svg
    alt: logo
  actions:
    - theme: brand
      text: 开始使用
      link: /guide
    - theme: alt
      text: 浏览组件
      link: /components/
    - theme: alt
      text: AI 集成
      link: /ai
features:
  - title: 统一的类型入口
    details: 从 x-widgets-antdv 导入受支持的控件与业务控件，类型声明随 ESM 与 CommonJS 构建一同生成。两个模块格式共享同一套契约，应用始终从包根目录导入。
  - title: Schema 优先的工作流
    details: 在搜索表单与更大的表单流程之间复用字段定义；将 API 请求与领域状态保留在宿主应用中。搜索、编辑和审核流程可以共用同一套类型化字段契约，从紧凑筛选区延伸到完整表单页。
  - title: 面向 Agent 的参考资料
    details: 可搜索的 VitePress 文档、llms.txt、框架兼容性说明，以及针对本包的编码 Agent 技能。让编码工具先依据源码类型，再生成组件代码，并用源码声明核对 props、类型和兼容性。
---

为已使用 Ant Design Vue 4 的 Vue 3 应用而构建。加载 Ant Design Vue 的重置样式表与本包的样式表，然后组合使用[已导出的组件](/components/)——它们既接受上游的 props，也遵循本包特有的包装层约定。

本包与 `x-widgets-element-plus` 是不同的 UI 包；两者的框架、样式体系以及组件特有的行为均不可互换。
