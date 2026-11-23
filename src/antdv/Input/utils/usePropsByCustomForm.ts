import { getValue, setFormdata } from '../../../utils/handleFormData'

// 给input加上一些默认事件和属性
export default function usePropsByCustomForm(props: any) {
    const { formData, name, placeholder, label } = props

    let saveProps = {}
    if (formData) {
        saveProps = {
            'onUpdate:value': (value: string) => {
                setFormdata(formData, name, value)
            },
            value: getValue(formData, name),
            placeholder: placeholder || (label ? `请输入${label}` : placeholder),
        }
    }

    return saveProps
}
