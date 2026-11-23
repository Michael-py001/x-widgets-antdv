import Typography from './BasicTypography'
import type { App } from 'vue'

export default Object.assign(Typography, {
    install: (app: App) => {
        app.component(Typography.name, Typography)
    },
})
