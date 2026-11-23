import Flex from './BasicFlex'
import type { App } from 'vue'

export default Object.assign(Flex, {
    install: (app: App) => {
        app.component(Flex.name, Flex)
    },
})
