import FunctionButton from './FunctionButton'
import type { App } from 'vue'
import type { FunctionButtonProps, FunctionButtonOptionsType } from './types/props'

export type { FunctionButtonProps, FunctionButtonOptionsType }

export default Object.assign(FunctionButton, {
    install: (app: App) => {
        app.component(FunctionButton.name, FunctionButton)
    },
})
