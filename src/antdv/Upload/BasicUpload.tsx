import { defineComponent } from 'vue'
import { Upload } from 'ant-design-vue'
import { XUploadProps } from './types/props'
import { basicFormProps } from './types/basicFormProps'
import { setFormdata, getValue } from '../../utils/handleFormData'

export default defineComponent<XUploadProps>({
    name: 'XUpload',

    inheritAttrs: true, // TAG: Props Reactive
    props: {
        ...Upload.props,
        ...basicFormProps(),
    },
    setup(props, { attrs, slots }) {
        const { formData, name, event } = props
        const { _is_x_form_item } = attrs // 经过custom/FormItem处理的标志
        let basicProps = {}
        return () => {
            // Upload 的值字段是 fileList，而非 value
            if (_is_x_form_item && formData) {
                basicProps = {
                    'onUpdate:fileList': (value: any[]) => {
                        setFormdata(formData, name, value)
                    },
                    fileList: getValue(formData, name),
                }
            }
            return (
                <Upload {...attrs} {...props} {...basicProps} {...event}>
                    {{ ...slots }}
                </Upload>
            )
        }
    },
})
