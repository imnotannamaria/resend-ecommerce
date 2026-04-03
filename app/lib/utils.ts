export function formatDate(value: string | undefined): string | undefined {
  if (!value) return value;
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

export function computeTotal(
  qty: string | undefined,
  unit: string | undefined,
): string {
  const q = parseFloat(qty || '');
  const u = parseFloat(unit || '');
  if (!Number.isNaN(q) && !Number.isNaN(u) && q > 0 && u > 0)
    return (q * u).toFixed(2);
  return '';
}
