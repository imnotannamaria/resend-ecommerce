'use client';

import { Button, Text } from '@radix-ui/themes';
import { Check, ChevronDown } from 'lucide-react';

export function StepSection({
  step,
  title,
  done,
  locked,
  open,
  onToggle,
  onNext,
  nextLabel = 'Continue',
  children,
}: {
  step: number;
  title: string;
  done: boolean;
  locked: boolean;
  open: boolean;
  onToggle: () => void;
  onNext: () => void;
  nextLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-b border-(--gray-5) transition-colors duration-200 ${done && !open ? 'bg-(--gray-2)' : ''}`}
    >
      <button
        type="button"
        disabled={locked}
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${locked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-(--gray-2)'}`}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${done ? 'bg-(--gray-12)' : 'border border-(--gray-7)'}`}
        >
          {done ? (
            <Check size={11} className="text-(--gray-1)" />
          ) : (
            <Text size="1" color="gray" className="leading-none">
              {step}
            </Text>
          )}
        </div>
        <Text size="2" weight="medium" className="flex-1 text-left">
          {title}
        </Text>
        {!locked && (
          <ChevronDown
            size={14}
            className={`text-(--gray-9) transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-300 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-3 flex flex-col gap-3">
          {children}
          <Button
            type="button"
            size="2"
            color="gray"
            highContrast
            className="w-full mt-1"
            onClick={onNext}
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
