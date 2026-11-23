import type { SelectProps as AntdSelectProps } from 'ant-design-vue'
import type { BasicFormProps } from './basicFormProps'

interface SelectProps extends Omit<AntdSelectProps, 'mode'> {
    mode?: AntdSelectProps['mode'] | 'multiple-enhance' | 'single'
}
export interface XSelectProps extends SelectProps, BasicFormProps {}
