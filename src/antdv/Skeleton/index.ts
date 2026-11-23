import Skeleton from './BasicSkeleton'
import type { App } from 'vue'

export default Object.assign(Skeleton, {
    install: (app: App) => {
        app.component(Skeleton.name, Skeleton)
    },
})
