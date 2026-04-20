const DEFAULT_EMAIL_ACCENT = '#18181b';

function normalizeAccentHex(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  let body = raw;
  if (body.startsWith('#')) {
    body = body.slice(1);
  }

  if (/^[0-9A-Fa-f]{6}$/.test(body)) {
    return `#${body.toLowerCase()}`;
  }
  if (/^[0-9A-Fa-f]{3}$/.test(body)) {
    const r = body.slice(0, 1);
    const g = body.slice(1, 2);
    const b = body.slice(2, 3);
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}

/**
 * Normalizes accent for inline styles in React Email (Tailwind cannot depend on runtime hex).
 * Accepts `#RRGGBB`, `#RGB`, or bare `RRGGBB` / `RGB` so custom picker matches browser preview.
 */
export function resolveEmailAccentColor(hex: string | undefined): string {
  if (!hex) return DEFAULT_EMAIL_ACCENT;
  const normalized = normalizeAccentHex(hex);
  return normalized ?? DEFAULT_EMAIL_ACCENT;
}

export type EmailRadiusPreset = 'sharp' | 'medium' | 'large';

/** Matches the Design panel / live preview (`sharp` | `medium` | `large`). */
export function resolveEmailRadius(
  value: string | undefined,
): EmailRadiusPreset {
  if (value === 'sharp' || value === 'medium' || value === 'large') {
    return value;
  }
  return 'medium';
}

/** Outer card (`Container`): same scale as preview `rounded-lg` / `rounded-2xl`. */
const EMAIL_RADIUS_CONTAINER_PX: Record<EmailRadiusPreset, string> = {
  sharp: '0px',
  medium: '8px',
  large: '16px',
};

/** Inner panels, thumbnails, buttons: matches preview inner radii. */
const EMAIL_RADIUS_INNER_PX: Record<EmailRadiusPreset, string> = {
  sharp: '0px',
  medium: '6px',
  large: '10px',
};

export function emailBorderRadius(
  preset: EmailRadiusPreset,
  kind: 'container' | 'inner',
): string {
  return kind === 'container'
    ? EMAIL_RADIUS_CONTAINER_PX[preset]
    : EMAIL_RADIUS_INNER_PX[preset];
}

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
