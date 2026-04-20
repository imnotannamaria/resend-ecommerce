'use client';

import { Flex, TextField } from '@radix-ui/themes';
import type React from 'react';
import type { UseFormRegister, UseFormTrigger } from 'react-hook-form';
import { FormField } from '@/app/components/form-field';
import { StepSection } from '@/app/components/step-section';

interface BrandStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  // biome-ignore lint/suspicious/noExplicitAny: shared across multiple form schemas
  register: UseFormRegister<any>;
  errors: Record<string, { message?: string } | undefined>;
  // biome-ignore lint/suspicious/noExplicitAny: shared across multiple form schemas
  trigger: UseFormTrigger<any>;
}

export function BrandStep({
  activeStep,
  setActiveStep,
  register,
  errors,
  trigger,
}: BrandStepProps) {
  return (
    <StepSection
      step={2}
      title="Brand"
      done={activeStep > 2}
      locked={activeStep < 2}
      open={activeStep === 2}
      onToggle={() => setActiveStep((s) => (s === 2 ? 1 : 2))}
      onNext={async () => {
        const ok = await trigger([
          'company_name',
          'help_center_url',
          'unsubscribe_url',
        ]);
        if (ok) setActiveStep(3);
      }}
      nextLabel="Continue to Order →"
    >
      <Flex direction="column" gap="3">
        <FormField
          label="Company name"
          required
          error={errors.company_name?.message}
        >
          <TextField.Root
            size="2"
            placeholder="Acme Inc."
            {...register('company_name')}
          />
        </FormField>
        <FormField
          label="Help Center URL"
          error={errors.help_center_url?.message}
        >
          <TextField.Root
            size="2"
            placeholder="https://acme.com/help"
            {...register('help_center_url')}
          />
        </FormField>
        <FormField
          label="Unsubscribe URL"
          error={errors.unsubscribe_url?.message}
        >
          <TextField.Root
            size="2"
            placeholder="https://acme.com/unsubscribe"
            {...register('unsubscribe_url')}
          />
        </FormField>
      </Flex>
    </StepSection>
  );
}
