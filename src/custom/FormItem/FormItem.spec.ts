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

  // Each new schema control must resolve through widgetMap and write its
  // update value back into the shared formData object via the form bridge.
  const bridgeCases: Array<{
    type: string
    name: string
    initial: any
    next: any
    nativeName: string
    valueProp: string
    updateEvent: string
  }> = [
    { type: 'cascader', name: 'area', initial: [], next: ['zj', 'hz'], nativeName: 'ACascader', valueProp: 'value', updateEvent: 'update:value' },
    { type: 'rate', name: 'score', initial: 2, next: 5, nativeName: 'ARate', valueProp: 'value', updateEvent: 'update:value' },
    { type: 'slider', name: 'progress', initial: 10, next: 80, nativeName: 'ASlider', valueProp: 'value', updateEvent: 'update:value' },
    { type: 'mentions', name: 'comment', initial: '', next: '@someone hi', nativeName: 'AMentions', valueProp: 'value', updateEvent: 'update:value' },
    { type: 'transfer', name: 'assigned', initial: [], next: ['u1'], nativeName: 'ATransfer', valueProp: 'targetKeys', updateEvent: 'update:targetKeys' },
    { type: 'upload', name: 'files', initial: [], next: [{ uid: '1' }], nativeName: 'AUpload', valueProp: 'fileList', updateEvent: 'update:fileList' },
    { type: 'segmented', name: 'mode', initial: 'a', next: 'b', nativeName: 'ASegmented', valueProp: 'value', updateEvent: 'update:value' },
  ]

  it.each(bridgeCases)('$type writes its value back to formData', ({ type, name, initial, next, nativeName, valueProp, updateEvent }) => {
    const formData = { [name]: initial }
    const wrapper = mount(FormItem, {
      props: { name, label: 'Label', type, formData },
    })

    const control = wrapper.findComponent({ name: nativeName })
    expect(control.exists(), `${type} adapter did not render ${nativeName}`).toBe(true)
    expect(control.props(valueProp), `${type} initial value is bound`).toEqual(initial)
    control.vm.$emit(updateEvent, next)
    expect(formData[name]).toEqual(next)
  })

  it('accepts x- aliases and the autocomplete alias for the new controls', () => {
    const aliases = [
      { type: 'x-cascader', nativeName: 'ACascader' },
      { type: 'x-rate', nativeName: 'ARate' },
      { type: 'x-slider', nativeName: 'ASlider' },
      { type: 'x-mentions', nativeName: 'AMentions' },
      { type: 'x-transfer', nativeName: 'ATransfer' },
      { type: 'x-upload', nativeName: 'AUpload' },
      { type: 'x-segmented', nativeName: 'ASegmented' },
      { type: 'autocomplete', nativeName: 'AutoComplete' },
    ]
    for (const { type, nativeName } of aliases) {
      const formData: Record<string, any> = {}
      const wrapper = mount(FormItem, {
        props: { name: 'field', type, formData },
      })
      // auto-complete renders an internal autocomplete component with a
      // different name; assert the alias at least resolves to a non-slot node.
      if (type === 'autocomplete') {
        expect(wrapper.find('.ant-select').exists()).toBe(true)
      } else {
        expect(wrapper.findComponent({ name: nativeName }).exists(), `${type} alias`).toBe(true)
      }
    }
  })
})
