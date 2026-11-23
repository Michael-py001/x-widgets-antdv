import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Table from './BasicTable';

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

describe('Table', () => {
  it('renders column headers and row data', () => {
    const wrapper = mount(Table, {
      props: {
        autoSrcollHeight: false,
        columns: [{ title: 'Name', dataIndex: 'name', key: 'name' }],
        dataSource: [{ key: 'row-1', name: 'Alpha' }]
      }
    });

    expect(wrapper.find('.ant-table').exists()).toBe(true);
    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Alpha');
  });
});
