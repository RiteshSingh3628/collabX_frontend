'use client';

import { Controller } from 'react-hook-form';
import { InlineError } from '@/components/talent-ui';

const SelectRadio = ({
  className = '',
  control,
  errors,
  isRequired = true,
  label,
  name,
  placeholder,
  options,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={`flex w-full min-w-24 flex-col gap-4 ${className}`}>
          {label && (
            <label
              htmlFor={`radio-group-${name}`}
              className="block tracking-wide text-slate-500 font-medium text-sm"
            >
              {label}
            </label>
          )}
          <div className="relative flex flex-row gap-30">
            {options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2"
              >
                <input
                  {...props}
                  id={`${name}-${option.value}`}
                  type="radio"
                  value={option.value}
                  checked={String(field.value) === String(option.value)}
                  onChange={() => field.onChange(option.value)}
                  className="h-4 w-4 text-color-primary-600 border-slate-200 "
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="text-sm font-medium text-slate-700 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <InlineError errors={errors} name={name} />
        </div>
      )}
    />
  );
};

export default SelectRadio;
