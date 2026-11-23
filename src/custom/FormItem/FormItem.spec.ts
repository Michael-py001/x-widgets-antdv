import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import FormItem from './FormItem'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('CustomFormItem', () => {
  it('renders a VNode returned by a formSlot callback with field context', () => {
    const formData = { title: 'Record' }
    const wrapper = mount(FormItem, {
      props: {
        name: 'title',
        label: 'Title',
        formData,
        formSlot: ({ item, name, label, formData: slotFormData }) =>
          h('strong', `${label}:${name}:${item.type}:${slotFormData.title}`),
      },
    })

    expect(wrapper.find('strong').text()).toBe('Title:title::Record')
  })
})
