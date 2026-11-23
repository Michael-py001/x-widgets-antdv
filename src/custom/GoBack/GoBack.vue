<template>
    <div class="x-GoBack-containor">
        <div v-bind="$attrs">
            <Button type="link" :hide="false" style="padding-left: 0" @click="goBack">
                <left-outlined />
                <slot>{{ text }}</slot>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
/* 
 exammple：<GoBack/>
*/
import { LeftOutlined } from '@ant-design/icons-vue'
import Button from '../../antdv/Button'
import { useRouter } from 'vue-router'

defineOptions({
    name: 'GoBack',
})

const props = defineProps({
    // 是否自定义返回按钮
    native: {
        type: Boolean,
        default: false,
    },
    // 返回按钮文本
    text: {
        type: String,
        default: '返回上一页',
    },
})

const emit = defineEmits(['goBack'])
const router = useRouter()

const goBack = () => {
    if (props.native) {
        emit('goBack')
    } else {
        router.back()
    }
}
</script>
