import { defineComponent } from 'vue'
import { Comment } from 'ant-design-vue'
import { XCommentProps } from './types/props'

export default defineComponent<XCommentProps>({
    name: 'XComment',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Comment {...attrs} {...props}>
                    {{ ...slots }}
                </Comment>
            )
        }
    },
})
