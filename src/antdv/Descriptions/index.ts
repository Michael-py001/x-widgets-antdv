import Descriptions from './BasicDescriptions'
import DescriptionsItem from './DescriptionsItem'
import type { App } from 'vue'

export { Descriptions, DescriptionsItem }

export default Object.assign(Descriptions, {
    install: (app: App) => {
        app.component(Descriptions.name, Descriptions)
        app.component(DescriptionsItem.name, DescriptionsItem)
    },
})
