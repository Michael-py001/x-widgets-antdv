---
layout: home
hero:
  name: x-widgets-antdv
  text: Vue 3 controls
  tagline: Typed schema widgets for forms, tables, and workflows built on Ant Design Vue 4.
  actions:
    - theme: brand
      text: Get started
      link: /guide
    - theme: alt
      text: Browse components
      link: /components/
    - theme: alt
      text: AI integration
      link: /ai
features:
  - title: One typed entry point
    details: Import the supported controls and package widgets from x-widgets-antdv, with declarations generated alongside ESM and CommonJS builds. Keep one package-root import surface while both module formats share the same contract.
  - title: Schema-first workflows
    details: Reuse field definitions across search forms and larger form flows; keep API requests and domain state in the host application. Use the same typed field contracts across search, edit, and review flows, from compact filters to full-page forms.
  - title: Agent-ready references
    details: Searchable VitePress docs, llms.txt, framework compatibility notes, and a package-specific coding-agent skill. Point coding tools at source-backed types before generating a component, and use the source declarations to check props, types, and compatibility.
---

Built for Vue 3 applications already using Ant Design Vue 4. Load Ant Design Vue's reset stylesheet and the package stylesheet, then compose the [documented exports](/components/) using upstream props plus package-specific wrapper contracts.

This is a separate UI package from `x-widgets-element-plus`; the two frameworks, style systems, and component-specific behavior are not interchangeable.

