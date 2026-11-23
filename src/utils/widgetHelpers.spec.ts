import { describe, expect, it } from 'vitest';
import { findObjectById, formatDecimal, parserDecimal } from './widgetHelpers';

describe('widgetHelpers', () => {
  it('formats decimal values without changing their precision', () => {
    expect(formatDecimal('1234567.890')).toBe('1,234,567.890');
    expect(parserDecimal('1,234,567.890')).toBe('1234567.890');
  });

  it('finds nested select options by value', () => {
    expect(findObjectById('city', [{ value: 'province', children: [{ value: 'city', label: 'City' }] }]))
      .toEqual({ value: 'city', label: 'City' });
  });
});
