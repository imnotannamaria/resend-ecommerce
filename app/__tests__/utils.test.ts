import { describe, expect, it } from 'vitest';

function computeTotal(
  qty: string | undefined,
  unit: string | undefined,
): string {
  const q = parseFloat(qty || '');
  const u = parseFloat(unit || '');
  if (!Number.isNaN(q) && !Number.isNaN(u) && q > 0 && u > 0)
    return (q * u).toFixed(2);
  return '';
}

function formatDate(value: string | undefined): string | undefined {
  if (!value) return value;
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

describe('computeTotal', () => {
  it('multiplies quantity by unit price', () => {
    expect(computeTotal('2', '10.00')).toBe('20.00');
  });

  it('returns empty string when quantity is missing', () => {
    expect(computeTotal(undefined, '10.00')).toBe('');
  });

  it('returns empty string when unit price is missing', () => {
    expect(computeTotal('2', undefined)).toBe('');
  });

  it('returns empty string when both are missing', () => {
    expect(computeTotal(undefined, undefined)).toBe('');
  });

  it('returns empty string when quantity is zero', () => {
    expect(computeTotal('0', '10.00')).toBe('');
  });

  it('returns empty string when unit price is zero', () => {
    expect(computeTotal('2', '0')).toBe('');
  });

  it('returns empty string for non-numeric strings', () => {
    expect(computeTotal('abc', '10.00')).toBe('');
  });

  it('handles decimal quantities', () => {
    expect(computeTotal('1.5', '10.00')).toBe('15.00');
  });

  it('formats result to 2 decimal places', () => {
    expect(computeTotal('3', '33.33')).toBe('99.99');
  });
});

describe('formatDate', () => {
  it('formats a valid date string', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });

  it('returns undefined when value is undefined', () => {
    expect(formatDate(undefined)).toBeUndefined();
  });

  it('returns empty string when value is empty string', () => {
    expect(formatDate('')).toBe('');
  });

  it('formats december correctly', () => {
    expect(formatDate('2024-12-25')).toBe('December 25, 2024');
  });
});
