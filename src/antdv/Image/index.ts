import Image from './BasicImage'
import ImagePreviewGroup from './ImagePreviewGroup'
import type { App } from 'vue'

export { Image, ImagePreviewGroup }

export default Object.assign(Image, {
    install: (app: App) => {
        app.component(Image.name, Image)
        app.component(ImagePreviewGroup.name, ImagePreviewGroup)
    },
})
