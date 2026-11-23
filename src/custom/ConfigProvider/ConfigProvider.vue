<!-- 
    @description: 配置组件
    @author: WuShiLi
 -->

<template>
    <ConfigProvider :locale="locale === 'en' ? enUS : zhCN">
        <slot></slot>
    </ConfigProvider>
</template>

<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

defineOptions({
    name: 'CustomConfigProvider',
})
const props = defineProps({
    locale: {
        type: String,
        default: 'zh',
    },
})
</script>

<style lang="less" scoped>
.table {
    margin: 12px 0;
}
</style>
