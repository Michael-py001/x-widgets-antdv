# Installation & setup

## Requirements

| Dependency | Supported line | Notes |
| --- | --- | --- |
| Node.js | 18+ | For the consuming app's toolchain; use a supported active LTS release. |
| Vue | 3.5+ | Peer dependency. |
| Ant Design Vue | 4.x | Peer dependency; install the reset stylesheet separately. |
| `@ant-design/icons-vue` | 7.x | Peer dependency used by wrapped widgets. |
| Vue Router | 4.x | Peer dependency required by `GoBack`. |

Install the package and its UI framework peers:

```sh
npm install x-widgets-antdv vue ant-design-vue @ant-design/icons-vue vue-router
```

## Global registration

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'x-widgets-antdv/style.css'
import XWidgets from 'x-widgets-antdv'
import App from './App.vue'

createApp(App).use(Antd).use(XWidgets).mount('#app')
```

Load Ant Design Vue's reset CSS and the library CSS once in the application entry. The library does not install Ant Design Vue for you.

## Selective registration

All documented names are exported from the package root. Import the exact names from [the export catalog](/en/components/), and register as normal Vue components:

```ts
import { createApp } from 'vue'
import { Button, SearchForm } from 'x-widgets-antdv'
import 'x-widgets-antdv/style.css'
import App from './App.vue'

createApp(App).component('XButton', Button).component('XSearchForm', SearchForm).mount('#app')
```

`XWidgets` plugin registration only includes exports whose component object has an `install` method. Do not assume that every named export is globally registered by the plugin. Named imports work regardless.

## Using wrapped controls

Wrapped Ant Design Vue components preserve the upstream control API where possible, then add form integration props where needed. Prefer the underlying component's documented props, events, and slots; wrapper-only contracts are listed in this site's schema and table pages. For instance:

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

## Compatibility and SSR

- The package targets the Vue 3 / Ant Design Vue 4 peer dependency range declared in `package.json`; verify peer ranges before upgrading your framework.
- `GoBack` uses Vue Router. Other components do not require a router unless their own contract says otherwise.
- Browser-specific functionality (file upload, storage, print, DOM measurements) must only run in a browser lifecycle or event. Import the root entry in a Node process only for code paths that do not render browser-only widgets.
- The package does not provide a CSS-in-JS theme bridge; configure Ant Design Vue through its own documented provider and tokens.

## Package scripts

```sh
npm run docs:dev       # local documentation server
npm run docs:build     # production documentation build
npm run docs:preview   # preview the generated site
npm run typecheck      # TypeScript + Vue checks
npm test
npm run build          # ESM, CJS, CSS, declarations
npm pack --dry-run
```
