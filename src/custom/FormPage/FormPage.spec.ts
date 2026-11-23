import { h, reactive } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import FormPage from './FormPage.vue';

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
    dispatchEvent: vi.fn()
  }))
});

describe('FormPage', () => {
  it('renders a field slot render callback returning a VNode', () => {
    const formData = reactive({ title: '' });
    let receivedContext: Record<string, any> | null = null;
    const wrapper = mount(FormPage, {
      props: {
        formModel: [
          {
            title: 'Section',
            column: [
              {
                label: 'Title',
                name: 'title',
                slot: (ctx: Record<string, any>) => {
                  receivedContext = ctx;
                  return h('strong', { class: 'slot-vnode' }, `Custom:${ctx.item.label}`);
                }
              }
            ]
          }
        ],
        formData
      }
    });

    expect(wrapper.find('strong.slot-vnode').text()).toBe('Custom:Title');
    expect(receivedContext).toMatchObject({ formData, item: { name: 'title' } });
  });
});
