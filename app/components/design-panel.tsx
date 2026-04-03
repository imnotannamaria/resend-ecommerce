'use client';

import {
  Flex,
  IconButton,
  ScrollArea,
  SegmentedControl,
  Separator,
  Switch,
  Text,
  TextField,
} from '@radix-ui/themes';
import { Circle, Square, SquareDashed } from 'lucide-react';
import type { CSSProperties } from 'react';

export type Radius = 'sharp' | 'medium' | 'large';

export interface DesignSection {
  label: string;
  key: string;
  value: boolean;
}

interface DesignPanelProps {
  accentColor: string;
  accentHex: string;
  radius: Radius;
  sections: DesignSection[];
  onAccentChange: (color: string, hex: string) => void;
  onRadiusChange: (radius: Radius) => void;
  onSectionChange: (key: string, value: boolean) => void;
}

const ACCENT_PRESETS = [
  { label: 'Zinc', value: 'var(--color-zinc-900)', hex: '#18181b' },
  { label: 'Blue', value: 'var(--color-blue-600)', hex: '#2563eb' },
  { label: 'Green', value: 'var(--color-green-600)', hex: '#16a34a' },
  { label: 'Indigo', value: 'var(--color-indigo-600)', hex: '#4f46e5' },
  { label: 'Orange', value: 'var(--color-orange-500)', hex: '#f97316' },
  { label: 'Red', value: 'var(--color-red-600)', hex: '#dc2626' },
  { label: 'Rose', value: 'var(--color-rose-500)', hex: '#f43f5e' },
  { label: 'Teal', value: 'var(--color-teal-500)', hex: '#14b8a6' },
  { label: 'Sky', value: 'var(--color-sky-500)', hex: '#0ea5e9' },
  { label: 'Violet', value: 'var(--color-violet-600)', hex: '#7c3aed' },
];

const RADIUS_OPTIONS: { label: string; value: Radius }[] = [
  { label: 'Sharp', value: 'sharp' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

const RADIUS_ICONS = { sharp: Square, medium: SquareDashed, large: Circle };

export function DesignPanel({
  accentColor,
  accentHex,
  radius,
  sections,
  onAccentChange,
  onRadiusChange,
  onSectionChange,
}: DesignPanelProps) {
  return (
    <div className="w-56 shrink-0 border-l border-(--gray-5) flex flex-col">
      <ScrollArea className="flex-1">
        <Flex direction="column" gap="6" p="4">
          <Flex direction="column" gap="3">
            <Text
              size="1"
              weight="bold"
              className="uppercase tracking-widest text-(--gray-9)"
            >
              Accent
            </Text>
            <div className="grid grid-cols-5 gap-2">
              {ACCENT_PRESETS.map(({ label, value, hex }) => (
                <div
                  key={value}
                  className="flex items-center justify-center px-1 py-2"
                >
                  <IconButton
                    title={label}
                    variant="ghost"
                    color="gray"
                    onClick={() => onAccentChange(value, hex)}
                    style={{ '--swatch': value } as CSSProperties}
                    className={`w-5! h-5! rounded-full! bg-(--swatch)! transition-all! ${accentColor === value ? 'outline-2! outline-(--swatch-ring)! outline-offset-0!' : ''}`}
                  />
                </div>
              ))}
            </div>
            <TextField.Root
              size="2"
              value={accentHex}
              maxLength={7}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(val)) onAccentChange(val, val);
              }}
            >
              <TextField.Slot>
                <div
                  className="w-3 h-3 rounded-full border border-(--gray-6) shrink-0"
                  style={{ backgroundColor: accentHex }}
                />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Separator size="4" />

          <Flex direction="column" gap="3">
            <Text
              size="1"
              weight="bold"
              className="uppercase tracking-widest text-(--gray-9)"
            >
              Sections
            </Text>
            <Flex direction="column" gap="3">
              {sections.map(({ label, key, value }) => (
                <Flex key={key} align="center" justify="between">
                  <Text size="2">{label}</Text>
                  <Switch
                    size="1"
                    checked={value}
                    onCheckedChange={(v) => onSectionChange(key, v)}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Separator size="4" />

          <Flex direction="column" gap="3">
            <Text
              size="1"
              weight="bold"
              className="uppercase tracking-widest text-(--gray-9)"
            >
              Radius
            </Text>
            <SegmentedControl.Root
              value={radius}
              onValueChange={(v) => onRadiusChange(v as Radius)}
              size="1"
            >
              {RADIUS_OPTIONS.map(({ label, value }) => {
                const Icon = RADIUS_ICONS[value];
                return (
                  <SegmentedControl.Item
                    key={value}
                    value={value}
                    title={label}
                  >
                    <Icon size={12} />
                  </SegmentedControl.Item>
                );
              })}
            </SegmentedControl.Root>
          </Flex>
        </Flex>
      </ScrollArea>
    </div>
  );
}
