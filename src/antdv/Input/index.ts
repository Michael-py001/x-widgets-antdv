import Input from './BasicInput'
import InputPassword from './BasicInputPassword'
import InputSearch from './BasicInputSearch'
import type { App } from 'vue'

export { Input, InputPassword, InputSearch }

export default Object.assign(Input, {
    install: (app: App) => {
        app.component(Input.name, Input)
        app.component(InputPassword.name, InputPassword)
        app.component(InputSearch.name, InputSearch)
    },
})
