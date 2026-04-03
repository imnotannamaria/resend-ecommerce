'use client';

import { Callout } from '@radix-ui/themes';
import { Info } from 'lucide-react';

export function DemoNotice() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <div className="p-3 border-t border-(--gray-5) shrink-0">
      <Callout.Root size="1" color="amber" variant="soft">
        <Callout.Icon>
          <Info size={12} />
        </Callout.Icon>
        <Callout.Text>
          This demo runs on my Resend key, emails can only be delivered to my
          address.{' '}
          <a
            href="https://github.com/imnotannamaria/resend-ecommerce"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 font-medium"
          >
            Clone the repo
          </a>{' '}
          and set your own <code className="font-mono">RESEND_API_KEY</code> to
          send to any inbox.
        </Callout.Text>
      </Callout.Root>
    </div>
  );
}
