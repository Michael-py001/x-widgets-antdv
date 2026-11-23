import type { InputNumberProps } from 'ant-design-vue'
import type { PropType, ExtractPropTypes } from 'vue'
export const EditInputProps = () => {
    return {
        editabled: {
            type: Boolean as PropType<boolean>,
            default: true,
        },
        align: {
            type: String as PropType<'left' | 'right' | 'center'>,
            default: 'left',
        },
    }
}

export type EditInputPropsType = InputNumberProps &
    ExtractPropTypes<ReturnType<typeof EditInputProps>>
