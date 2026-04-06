'use client';

import { TextField } from '@radix-ui/themes';
import { useState } from 'react';

interface DateInputProps {
  value?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  name?: string;
  // biome-ignore lint/suspicious/noExplicitAny: must accept RHF's ChangeHandler signature
  onBlur?: (e?: any) => any;
}

export function DateInput({ value, onChange, name, onBlur }: DateInputProps) {
  // display state holds the masked string, e.g. "22/05/2002"
  const [display, setDisplay] = useState(() => {
    if (!value) return '';
    const [y, m, d] = value.split('-');
    return y && m && d ? `${d}/${m}/${y}` : '';
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);

    let masked = digits;
    if (digits.length > 2) masked = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4)
      masked = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    setDisplay(masked);

    if (digits.length === 8) {
      const d = digits.slice(0, 2);
      const m = digits.slice(2, 4);
      const y = digits.slice(4, 8);
      onChange?.({ target: { value: `${y}-${m}-${d}`, name } });
    } else {
      onChange?.({ target: { value: '', name } });
    }
  }

  return (
    <TextField.Root
      size="2"
      placeholder="DD/MM/YYYY"
      value={display}
      onChange={handleChange}
      onBlur={onBlur}
      inputMode="numeric"
    />
  );
}
