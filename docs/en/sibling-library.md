---
layout: page
---

# Sibling library: x-widgets-element-plus

`x-widgets-antdv` and `x-widgets-element-plus` belong to the same widget family: they **share a schema-first API design** but target different UI frameworks. This package is built on Ant Design Vue 4; the sibling is built on Element Plus 2. Define your fields once and let the schema drive forms and tables in either library — but the rendered components, styles, and framework-specific options are maintained separately.

## Which one to choose

- Your app already uses **Ant Design Vue** → use this package, `x-widgets-antdv`.
- Your app already uses **Element Plus** → use the sibling, `x-widgets-element-plus`.
- Do not mix both plugins or style systems in one app. Behaviors and names are **not interchangeable**; shared schema concepts do not mean identical props, events, or rendering. Always check each package's own declarations and docs when migrating.

## Sibling resources

- Documentation: <https://michael-py001.github.io/x-widgets-element-plus/>
- Install: `npm install x-widgets-element-plus vue element-plus @element-plus/icons-vue`

For the shared concepts and differences, see [Cross-library compatibility](/en/components/compatibility).
