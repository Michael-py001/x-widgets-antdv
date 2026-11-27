# Slots

`FormPage` supports custom rendering for cells (`formSlot`), blocks (`slot`), and containers (`header` / `footer` / `modelTitle`). Cells and blocks accept either a string slot name filled in the template, or a render function returning a VNode — the latter supports both `h()` and TSX `<div>` styles. The example below shows all three cell approaches at once so you can compare them.

<ClientOnly><AntdvSlotDemo /></ClientOnly>
