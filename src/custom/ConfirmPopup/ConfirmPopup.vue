<!-- 
    @description 确认弹窗组件
    @author WuShiLi
 -->
<template>
    <div class="li-ConfirmPopup">
        <Modal
            :open="show"
            :centered="true"
            :closable="closable"
            :mask-closable="false"
            :width="width"
            class="li-ConfirmPopup-container"
            destroyOnClose
            @cancel="clickCancel"
            :showFullScreenIcon="showFullScreenIcon"
            v-bind="$attrs"
            :aria-hidden="!show"
        >
            <template #title>
                <slot name="title">
                    <span class="li-ConfirmPopup-title">
                        {{ title }}
                    </span>
                </slot>
            </template>
            <slot></slot>
            <template #footer>
                <slot name="footer">
                    <Button
                        v-if="showCancelBtn"
                        :disabled="okBtnLoading"
                        type="primary"
                        :hide="false"
                        ghost
                        @click="clickCancel"
                        v-bind="(attrs.cancelButtonProps as object) || {}"
                    >
                        {{ cancelText }}
                    </Button>
                    <Button
                        v-if="showConfirmBtn"
                        type="primary"
                        :hide="false"
                        :disabled="okBtnLoading || disabled"
                        :loading="okBtnLoading"
                        @click="clickConfirm"
                        v-bind="(attrs.okButtonProps as object) || {}"
                    >
                        {{ confirmText }}
                    </Button>
                </slot>
            </template>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import Modal from '../../antdv/Modal'
import Button from '../../antdv/Button'
import { useAttrs } from 'vue'
const attrs = useAttrs()
const emit = defineEmits(['update:formData', 'confirm', 'cancel', 'update:show'])
defineOptions({
    name: 'XConfirmPopup',
})
const props = defineProps({
    title: {
        type: String,
        default: '标题',
    },
    show: {
        type: Boolean,
        default: false,
    },
    // 弹窗宽度
    width: {
        type: [String, Number],
        default: '500px',
    },
    // 重置按钮文字，传空则不显示按钮
    cancelText: {
        type: String,
        default: '取消',
    },
    // 搜索按钮文字，传空则不显示按钮
    confirmText: {
        type: String,
        default: '确认',
    },
    // 是否显示取消按钮
    showCancelBtn: {
        type: Boolean,
        default: true,
    },
    // 是否显示确认按钮
    showConfirmBtn: {
        type: Boolean,
        default: true,
    },
    //确认按钮loading
    okBtnLoading: {
        type: Boolean,
        default: false,
    },
    // 是否显示右上角关闭按钮
    closable: {
        type: Boolean,
        default: false,
    },
    showFullScreenIcon: {
        type: Boolean,
        default: false,
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false,
    },
})

// 确认回调
function clickConfirm() {
    emit('confirm')
}

// 取消回调
function clickCancel() {
    emit('update:show', false)
    emit('cancel')
}
</script>

<style lang="less">
.content {
    overflow-y: auto;
}
</style>
