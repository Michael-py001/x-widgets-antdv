import Carousel from './BasicCarousel'
import type { App } from 'vue'

export default Object.assign(Carousel, {
    install: (app: App) => {
        app.component(Carousel.name, Carousel)
    },
})
