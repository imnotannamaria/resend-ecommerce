'use client';

import { IconButton } from '@radix-ui/themes';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CodeBlock({ code, note }: { code: string; note?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between gap-4 bg-(--gray-2) border border-(--gray-6) rounded-lg px-4 py-3 font-mono text-sm">
      <div className="flex items-center gap-3 min-w-0">
        {note && (
          <span className="text-(--gray-9) shrink-0 text-xs">{note}</span>
        )}
        <span className="text-(--gray-12) truncate">{code}</span>
      </div>
      <IconButton
        variant="ghost"
        color="gray"
        size="1"
        onClick={handleCopy}
        aria-label="Copy"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </IconButton>
    </div>
  );
}
