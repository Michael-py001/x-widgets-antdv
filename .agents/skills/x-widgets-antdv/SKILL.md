---
name: x-widgets-antdv
description: Build Vue 3 interfaces with the x-widgets-antdv package when the host app uses Ant Design Vue 4.
---

# x-widgets-antdv skill

Use this skill whenever a task builds or changes UI in a Vue 3 + Ant Design Vue application that depends on `x-widgets-antdv`.

## Select the correct library

- Choose `x-widgets-antdv` only when the host UI framework is Ant Design Vue.
- If the host uses Element Plus, use the sibling `x-widgets-element-plus` package and its own docs/skill. Do not mix their UI plugins or style systems.

## Read the local contract

Before writing code, read these package docs (relative to the package root). Use `docs/` for Simplified Chinese (the default) and `docs/en/` for English (for example, `docs/guide.md` → `docs/en/guide.md`). Follow the user's language when explaining the API, while preserving component names, prop names, and code identifiers.

1. `docs/guide.md` for peer dependencies, registration, and CSS.
2. `docs/components/index.md` for exact public exports.
3. `docs/components/forms.md` for `ColumnForFormItemType`, schema fields, and SearchForm events.
4. `docs/components/table.md` for wrapper additions and the upstream prop boundary.
5. `docs/components/compatibility.md` when migrating shared schemas or framework APIs.

The runtime root is `src/index.ts` → `src/components.ts`. Import public APIs from `x-widgets-antdv`; deep source paths are not stable API. Type declarations in `dist` are generated from source and should be typechecked before release.

## Implementation rules

- Include both `ant-design-vue/dist/reset.css` and `x-widgets-antdv/style.css` once in the application entry.
- Treat Vue, Ant Design Vue, the icon package, and Vue Router as peer dependencies; `GoBack` is the router-dependent widget.
- For form schemas, use the exported `ColumnForFormItemType`; check available `el`/`type` values and wrapper props before composing fields. `type` accepts bare names and `x-` aliases that resolve to the same adapter, matching `x-widgets-element-plus` naming; schema slots additionally accept VNode render callbacks (for example `formSlot: ({ formData }) => h('strong', formData.name)`).
- `transfer` binds selected keys via `targetKeys`; `upload` binds the controlled `fileList`; `segmented` is also schema-ready (`value`/`update:value`). This package has no `color-picker`, `input-otp`, `input-tag`, or `time-select` (`ant-design-vue` 4 has no upstream equivalents).
- Keep API access, request state, and domain validation in the consuming application. The widgets bind/render supplied data; they are not a data-fetching layer.
- Use Ant Design Vue documentation for native behavior and this package's types/docs for wrapper additions. Custom select modes are not upstream modes.
- Do not invent exports. If the desired capability is missing, say so and propose the smallest source-backed change.
- The plugin does not register every export; for one or a few controls, import and register named exports directly.

## Verification

From the package root, run `npm run typecheck`, `npm test`, `npm run build`, and `npm run docs:build` for changes affecting types, runtime, or public docs. For a consuming app, also verify peer versions, CSS, and the exact generated screen. Include the actual results; do not claim declaration or docs success from a successful runtime build alone.
