<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, Input, Select, Tag } from 'x-widgets-antdv'
import 'ant-design-vue/dist/reset.css'

const keyword = ref('')
const status = ref('all')
const submitted = ref(false)
const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' }
]
const summary = computed(() => `${keyword.value || 'All records'} · ${status.value}`)

function submit(): void {
  submitted.value = true
}
</script>

<template>
  <div class="x-demo">
    <div class="x-demo__row">
      <Input v-model:value="keyword" placeholder="Search records" allow-clear />
      <Select v-model:value="status" :options="statusOptions" />
      <Button type="primary" @click="submit">Apply</Button>
    </div>
    <div class="x-demo__result">
      <Tag color="blue">{{ submitted ? 'Applied' : 'Ready' }}</Tag>
      <span>{{ summary }}</span>
    </div>
  </div>
</template>

<style scoped>
.x-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.x-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.x-demo__row :deep(.ant-input),
.x-demo__row :deep(.ant-select) {
  min-width: 180px;
}

.x-demo__result {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 640px) {
  .x-demo__row > * {
    width: 100%;
  }
}
</style>
