import { describe, it, expect } from 'vitest';
import { formatCount } from '../src/lib/format';

describe('formatCount', () => {
  it('keeps a leading + and suffix while animating the number', () => {
    expect(formatCount({ prefix: '+', value: 5000, suffix: '' })).toBe('+5,000');
    expect(formatCount({ prefix: '', value: 80, suffix: '%' })).toBe('80%');
    expect(formatCount({ prefix: '', value: 12, suffix: '+' })).toBe('12+');
  });
  it('formats thousands with grouping', () => {
    expect(formatCount({ prefix: '', value: 1234567, suffix: '' })).toBe('1,234,567');
  });
});
