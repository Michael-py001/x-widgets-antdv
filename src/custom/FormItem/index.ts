import FormItem from './FormItem'
import CityPicker from './components/CityPicker/CityPicker'
import AreaPicker from './components/CityPicker/AreaPicker'
import type { App } from 'vue'
import type {
    ColumnForFormItemType,
    FormBlockSlotRender,
    FormBlockSlotRenderContext,
    FormItemSlotRender,
    FormItemSlotRenderContext,
} from './types/props'

export { FormItem, CityPicker, AreaPicker }
export default Object.assign(FormItem, {
    install: (app: App) => {
        app.component(FormItem.name, FormItem)
    },
})

export type {
    ColumnForFormItemType,
    FormBlockSlotRender,
    FormBlockSlotRenderContext,
    FormItemSlotRender,
    FormItemSlotRenderContext,
}
