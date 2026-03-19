"use client";

import { InlineError } from "@/components/talent-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

const SelectInput = ({
  className = "",
  control,
  errors,
  isRequired = false,
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
      render={({ field, fieldState }) => (
        <div className={`flex w-full min-w-24 flex-col gap-1 ${className}`}>
          {label && (
            <label
              htmlFor="input-field"
              className="block text-sm font-medium tracking-wide text-slate-500"
            >
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          <div className="relative flex flex-grow items-center">
            <Select
              {...props}
              value={String(field.value)}
              onValueChange={(value) => {
                if (value) {
                  field.onChange(value);
                }
              }}
            >
              <SelectTrigger
                className={`h-11 w-full rounded-none border outline-none focus:bg-white focus:outline-none ${
                  fieldState?.error ? "border-red-500" : "border-slate-200"
                }`}
              >
                <SelectValue placeholder={placeholder ?? label} />
              </SelectTrigger>
              <SelectContent className="border bg-white font-medium">
                {options?.map((option) => (
                  <SelectItem
                    className="hover:bg-color-primary-100 cursor-pointer"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <InlineError errors={errors} name={name} />
        </div>
      )}
    />
  );
};

export default SelectInput;
