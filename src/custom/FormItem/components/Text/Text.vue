<template>
    <span class="Text" :class="{ 'color-blue-bold': textBold }" v-bind="props" v-html="text"></span>
</template>

<script>
/**
 * @description 文本组件
 * @author WuShiLi
 */

import { basicFormProps } from '../basicFormProps'
export default {
    name: 'XText',
    props: {
        ...basicFormProps(),
        textBold: {
            type: Boolean,
            default: true,
        },
        textValue: {
            type: [String, Number, Boolean],
            default: '',
        },
    },
    computed: {
        text() {
            const result = this.textValue || this.formData[this.name]
            return this.filterScript(result)
        },
    },
    methods: {
        filterScript(str) {
            if (Object.prototype.toString.call(str) === '[object Null]') return '--'
            if (typeof str !== 'string') return str
            return str.replace(/<script[^>]*?>.*?<\/script>/gi, '') || '--'
        },
    },
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
.Text {
    white-space: pre-line;
}
</style>
