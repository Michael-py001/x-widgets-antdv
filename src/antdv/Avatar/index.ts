import Avatar from './BasicAvatar'
import type { App } from 'vue'

export default Object.assign(Avatar, {
    install: (app: App) => {
        app.component(Avatar.name, Avatar)
    },
})
