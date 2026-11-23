import type { InputNumberProps } from 'ant-design-vue'
import type { BasicFormProps } from './basicFormProps'

export interface XInputNumberProps extends InputNumberProps, BasicFormProps {
    formatPrice?: boolean
}
