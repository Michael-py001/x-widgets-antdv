# 插槽

`FormPage` 的单元格（`formSlot`）、区块（`slot`）与容器（`header` / `footer` / `modelTitle`）都支持自定义渲染。单元格和区块既可以写字符串插槽名在模板中补标记，也可以写返回 VNode 的渲染函数；后者支持 `h()` 与 TSX `<div>` 两种写法。下面的示例把三种单元格写法同时展示出来，便于对照选择。

<ClientOnly><AntdvSlotDemo /></ClientOnly>
