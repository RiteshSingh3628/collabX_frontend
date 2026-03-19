'use client';

import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import InlineError from '@/components/Custom_UI/InlineError';
import { cn } from '@/lib/utils';

const TextInput = ({ 
  className = '',
  control,
  isArabic = false,
  isRequired = false,
  label,
  labelClassName = '',
  name,
  placeholder,
  type = 'text',
  readOnly = false,
  ...props 
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <div className={cn('flex w-full min-w-24 flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor="input-field"
            className="text-slate-500 font-poppins text-sm font-medium"
          >
            {label}
            {isRequired && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}
        <Input
          className={cn(
            fieldState.error
              ? 'border-error'
              : readOnly
                ? 'bg-disabled border-grey-300'
                : ''
          )}
          {...field}
          value={field.value ?? ''}
          placeholder={placeholder ?? label}
          type={type}
          {...props}
        />
        <InlineError error={fieldState?.error?.message} />
      </div>
    )}
  />
);

export default TextInput;
