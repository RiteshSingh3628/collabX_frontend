"use client";

import InlineError from "@/components/Custom_UI/InlineError";
import { Controller } from "react-hook-form";

const TextareaInput = ({
  className = "",
  control,
  errors,
  isRequired = false,
  label,
  name,
  placeholder,
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
              htmlFor="textarea-field"
              className="block text-sm font-medium tracking-wide text-slate-500"
            >
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          <div className="relative flex grow items-center">
            <textarea
              {...props}
              {...field}
              placeholder={placeholder ?? label}
              className={`w-full resize-none rounded-none border p-3 text-slate-700 outline-none placeholder:text-base placeholder:text-slate-500 focus:bg-white focus:outline-none ${fieldState?.error ? "border-red-500" : "border-slate-200"}`}
              style={{ height: "150px" }}
            />
          </div>
          <InlineError errors={errors} name={name} />
        </div>
      )}
    />
  );
};

export default TextareaInput;
