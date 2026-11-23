import Slider from './BasicSlider'
import type { App } from 'vue'

export default Object.assign(Slider, {
    install: (app: App) => {
        app.component(Slider.name, Slider)
    },
})
