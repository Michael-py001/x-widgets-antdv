import { defineComponent } from 'vue'
import { Avatar } from 'ant-design-vue'
import { XAvatarProps } from './types/props'

export default defineComponent<XAvatarProps>({
    name: 'XAvatar',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Avatar {...attrs} {...props}>
                    {{ ...slots }}
                </Avatar>
            )
        }
    },
})
