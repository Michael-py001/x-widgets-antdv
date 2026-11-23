# x-widgets-antdv

[![CI](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml/badge.svg)](https://github.com/Michael-py001/x-widgets-antdv/actions/workflows/ci.yml) [![Docs](https://img.shields.io/badge/docs-online-blue.svg)](https://michael-py001.github.io/x-widgets-antdv/) [![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

Vue 3 form component library built on Ant Design Vue 4. Component names and APIs follow the wrapped controls where possible; custom widgets provide typed schema-driven forms, tables, dialogs, and related page workflows.

## Requirements

- Node.js 18 or newer
- Vue 3.5 or newer
- Ant Design Vue 4 and `@ant-design/icons-vue` 7
- `vue-router` 4 for the `GoBack` widget

## Install

```sh
npm install x-widgets-antdv vue ant-design-vue @ant-design/icons-vue vue-router
```

Vue and the UI framework packages are peer dependencies and must be installed by the consuming application.

## Usage

```ts
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import XWidgets from 'x-widgets-antdv';
import 'ant-design-vue/dist/reset.css';
import 'x-widgets-antdv/style.css';
import App from './App.vue';

createApp(App).use(Antd).use(XWidgets).mount('#app');
```

Individual components and their public types can also be imported from the package root:

```ts
import { Button, CustomForm, SearchForm, Table } from 'x-widgets-antdv';
import type { SearchFormProps, TableProps } from 'x-widgets-antdv';
```

The plugin registers exported components that provide an `install` method. Components that do not provide one remain available through named imports.

## Documentation

The English and Chinese documentation is published at https://michael-py001.github.io/x-widgets-antdv/ (source in `docs/`). Run `npm run docs:dev` to view it locally or `npm run docs:build` to build the static site. The `Deploy documentation` workflow publishes the site to GitHub Pages on pushes to `main` and via manual dispatch; Pages must use **GitHub Actions** as its build and deployment source. Repository contributors can also use `.agents/skills/x-widgets-antdv/SKILL.md` with coding agents.

## Development

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

Build artifacts are emitted to `dist/` as ESM, CommonJS, TypeScript declarations, and `style.css`.

## License

MIT. See [LICENSE](./LICENSE).
