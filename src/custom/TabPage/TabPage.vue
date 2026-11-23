<template>
    <div class="TabPage-container">
        <Tabs
            v-model:activeKey="computedActiveTab"
            class="tabs"
            :class="{ 'disabled-click': disabledClick }"
            v-bind="$attrs"
        >
            <TabPane
                v-for="(item, index) in tabs"
                :key="index"
                :disabled="item.disabled || disabledClick"
                :tab="item.title"
                :force-render="true"
            >
                <slot name="globalTop"></slot>
                <slot :name="item.slotName"></slot>
                <slot name="globalBottom"></slot>
            </TabPane>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Tabs, TabPane } from 'ant-design-vue'
const emit = defineEmits(['update:activeIndex'])
defineOptions({
    name: 'XTabPage',
})
interface TabItem {
    title: string
    slotName: string
    disabled?: boolean
}

const props = defineProps({
    // tab数据
    tabs: {
        type: Array as () => TabItem[],
        default: () => [],
    },
    // 激活的下标
    activeIndex: {
        type: [Number, String],
        default: 0,
    },
    // 是否禁用
    disabledClick: {
        type: Boolean,
        default: false,
    },
})

// 内部激活下标，双向绑定
const computedActiveTab = computed({
    get: () => {
        return props.activeIndex
    },
    set: val => {
        emit('update:activeIndex', val)
    },
})
</script>

<style lang="less" scoped>
.TabPage-container {
    .tabs {
        :deep(.ant-tabs-tab) {
            min-width: 120px;
            margin: 0;
            padding-left: 10px;
            padding-right: 10px;
            text-align: center;

            // &:first-child:before,
            // &:after {
            //     content: '';
            //     position: absolute;
            //     right: 0;
            //     top: 0;
            //     bottom: 0;
            //     height: 60%;
            //     width: 1px;
            //     margin: auto;
            //     background-color: #aaa;
            //  }
            //  &:first-child:before {
            //      left: 0;
            //      right: auto;
            //  }
            padding-left: 32px;
        }
        // 下划线
        // :deep(.ant-tabs-ink-bar) {
        //     // display: none !important;
        // }
        // 禁用也保留样式
        &.disabled-click {
            :deep(.ant-tabs-tab-disabled) {
                &.ant-tabs-tab {
                    color: rgba(0, 0, 0, 0.85);
                    cursor: default;
                }
                &.ant-tabs-tab-active {
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
