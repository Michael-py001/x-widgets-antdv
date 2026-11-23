import { h, reactive } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SearchForm from './SearchForm';

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

describe('SearchForm', () => {
  it('renders a schema field and emits search values', async () => {
    const formData = reactive({ keyword: '' });
    const wrapper = mount(SearchForm, {
      props: {
        column: [
          {
            label: 'Keyword',
            name: 'keyword',
            el: 'input',
            props: { placeholder: 'Search keyword' }
          }
        ],
        formData,
        enabledExpand: false
      }
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(wrapper.find('.x-search-form-btn-search').text().replace(/\s/g, '')).toBe('查询');

    await input.setValue('Alpha');
    await wrapper.find('.x-search-form-btn-search').trigger('click');
    await flushPromises();

    expect(wrapper.emitted('search')).toEqual([[{ keyword: 'Alpha' }]]);
  });

  it('renders a field slot render callback returning a VNode', () => {
    const formData = reactive({ keyword: '' });
    let receivedContext: Record<string, any> | null = null;
    const wrapper = mount(SearchForm, {
      props: {
        column: [
          {
            label: 'Custom',
            name: 'keyword',
            slot: (ctx: Record<string, any>) => {
              receivedContext = ctx;
              return h('strong', { class: 'slot-vnode' }, `Custom:${ctx.item.label}`);
            }
          }
        ],
        formData,
        enabledExpand: false
      }
    });

    expect(wrapper.find('strong.slot-vnode').text()).toBe('Custom:Custom');
    expect(receivedContext).toMatchObject({ formData, item: { name: 'keyword' } });
  });

  it('supports a type-only schema field', () => {
    const wrapper = mount(SearchForm, {
      props: {
        column: [
          {
            label: 'Keyword',
            name: 'keyword',
            type: 'input',
            props: { placeholder: 'Type-only keyword' }
          }
        ],
        formData: reactive({ keyword: '' }),
        enabledExpand: false
      }
    });

    expect(wrapper.find('input[placeholder="Type-only keyword"]').exists()).toBe(true);
  });
});
