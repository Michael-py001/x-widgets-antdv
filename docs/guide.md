# 安装与配置

## 环境要求

| 依赖 | 支持版本 | 说明 |
| --- | --- | --- |
| Node.js | 18+ | 用于宿主应用工具链；请使用受支持的活跃 LTS 版本。 |
| Vue | 3.5+ | peer 依赖（同伴依赖）。 |
| Ant Design Vue | 4.x | peer 依赖；重置样式表需单独安装引入。 |
| `@ant-design/icons-vue` | 7.x | 包装控件使用的 peer 依赖。 |
| Vue Router | 4.x | `GoBack` 所需的 peer 依赖。 |

安装本包及其 UI 框架的 peer 依赖：

```sh
npm install x-widgets-antdv vue ant-design-vue @ant-design/icons-vue vue-router
```

## 全局注册

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
import XWidgets from 'x-widgets-antdv'
import App from './App.vue'

createApp(App).use(Antd).use(XWidgets).mount('#app')
```

在应用入口中引入一次 Ant Design Vue 的重置 CSS 与本库的 CSS。本库不会替你安装 Ant Design Vue。

## 按需注册

所有文档列出的名称都从包根目录导出。从[导出清单](/components/)导入确切的名称，并按普通 Vue 组件注册即可：

```ts
import { createApp } from 'vue'
import { Button, SearchForm } from 'x-widgets-antdv'
import 'x-widgets-antdv/style.css'
import App from './App.vue'

createApp(App).component('XButton', Button).component('XSearchForm', SearchForm).mount('#app')
```

`XWidgets` 插件注册只包含组件对象带有 `install` 方法的导出。不要假设所有具名导出都会被插件全局注册。具名导入始终可用。

## 使用包装控件

被包装的 Ant Design Vue 组件会尽可能保留上游控件的 API，并在需要表单集成时添加相应 props。优先使用底层组件文档中的 props、事件与插槽；仅包装层特有的约定见本站的 schema 与表格页面。例如：

```vue
<script setup lang="ts">
import { Input, Select } from 'x-widgets-antdv'

const options = [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }]
</script>

<template>
  <Input placeholder="Title" />
  <Select :options="options" />
</template>
```

## 兼容性与 SSR

- 本包面向 `package.json` 中声明的 Vue 3 / Ant Design Vue 4 peer 依赖范围；升级框架前请核对 peer 范围。
- `GoBack` 使用 Vue Router。除非组件自身契约另有说明，其他组件均不依赖路由。
- 浏览器专属功能（文件上传、存储、打印、DOM 测量）只能在浏览器生命周期或事件中调用。在 Node 进程中仅对不渲染浏览器专属控件的代码路径导入根入口。
- 本包不提供 CSS-in-JS 主题桥接；请通过 Ant Design Vue 自身的 Provider 与 token 进行配置。

## 包脚本

```sh
npm run docs:dev       # 本地文档服务
npm run docs:build     # 生产文档构建
npm run docs:preview   # 预览生成的站点
npm run typecheck      # TypeScript + Vue 检查
npm test
npm run build          # ESM、CJS、CSS、类型声明
npm pack --dry-run
```
