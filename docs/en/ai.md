# AI and coding-agent guide

This package includes a focused agent skill at `.agents/skills/x-widgets-antdv/SKILL.md` for repository users; the same file is shipped with the npm package and copied to `/agents/skills/x-widgets-antdv/SKILL.md` in the VitePress output. Keep this page, `llms.txt`, and the source export list aligned when public APIs change.

## Give an agent the right context

1. State that the host application uses **Vue 3 + Ant Design Vue 4**.
2. Ask the agent to use `x-widgets-antdv`, not the Element Plus package.
3. Point it to this documentation and the matching `.agents/skills/x-widgets-antdv/SKILL.md`.
4. Require imports from the package root, plus the documented framework CSS and package CSS.
5. Ask it to use `ColumnForFormItemType` for schema and `TableProps` for the wrapped table rather than inventing props.
6. Validate generated examples with the package's `npm run typecheck`, `npm test`, and build scripts in a consuming app where possible.

## Context files

- [`/llms.txt`](/llms.txt): deployed compact index for retrieval systems; its source is `docs/public/llms.txt`.
- [Export catalog](/en/components/): exact names exported by the package root.
- [Controls](/en/components/controls): native controls and form-aware adapters.
- [Schema forms](/en/components/forms): field model and SearchForm contract.
- [Table](/en/components/table): wrapper options and upstream prop boundary.
- [Extended widgets](/en/components/extended-widgets): host-owned upload, print, navigation, tabs, and region data contracts.
- [Compatibility](/en/components/compatibility): migration constraints relative to Element Plus.

## Prompt template

> Build this screen in my Vue 3 + Ant Design Vue 4 application using `x-widgets-antdv`. Read the package's exported component catalog and matching skill first. Use only package-root exports and documented types; keep API/data fetching in the application, put schema in a typed `ColumnForFormItemType[]`, include the required Ant Design Vue and package styles, and report which local checks you ran. Do not assume Element Plus APIs or invent undocumented widget props.

## API grounding

The docs describe package-level contracts and are not a replacement for the framework's own reference. For an upstream Ant Design Vue prop or event, consult its upstream type/docs. For a package-specific wrapper prop, consult the corresponding exported TypeScript type and this version's source. Report a mismatch instead of silently generating an unsupported API.
