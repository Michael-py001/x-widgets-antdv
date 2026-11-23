import { defineComponent } from 'vue'
import { Upload } from 'ant-design-vue'
import { XUploadProps } from './types/props'

export default defineComponent<XUploadProps>({
    name: 'XUpload',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Upload {...attrs} {...props}>
                    {{ ...slots }}
                </Upload>
            )
        }
    },
})
