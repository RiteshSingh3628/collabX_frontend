"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import InlineError from "@/components/Custom_UI/InlineError";

const PasswordInput = ({
  className = "",
  control,
  errors = {},
  isRequired = false,
  label,
  labelClassName = "",
  name,
  placeholder,
  ref, // Accept but don't use directly
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  };

  const hasErrors = Object.keys(errors).length > 0 && name in errors;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={`flex w-full min-w-24 flex-col gap-1`}>
          {label && (
            <label
              htmlFor={name}
              className="font-poppins text-sm font-medium text-slate-500"
            >
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          <div className="relative flex flex-grow items-center">
            <Input
              id={name}
              className={cn(
                "rounded-none",
                hasErrors ? "border-error" : className || "border"
              )}
              {...field}
              placeholder={placeholder ?? label}
              type={isPasswordVisible ? "text" : "password"}
              {...props}
            />
            {!props.readOnly && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-color-secondary-default absolute right-3 cursor-pointer"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                {isPasswordVisible ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
          <InlineError error={errors[name]?.message} />
        </div>
      )}
    />
  );
};

export default PasswordInput;
