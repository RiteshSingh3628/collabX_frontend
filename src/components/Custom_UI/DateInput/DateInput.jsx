"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InlineError from "@/components/Custom_UI/InlineError";

export default function DateInput({
  control,
  name,
  label,
  placeholder = "Select date",
  className = "",
  inputClassName = "",
  labelClassName = "",
  readOnly = false,
  isRequired = false,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={className}>
          {label && (
            <label
              className={`mb-1 block text-sm font-medium text-gray-500 ${labelClassName}`}
            >
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <div
                className={`flex h-10 w-full cursor-pointer items-center justify-between border border-slate-200 bg-white px-3 text-sm ${readOnly ? "cursor-not-allowed bg-gray-50 text-gray-500" : ""} ${inputClassName}`}
              >
                <span className={!value ? "text-gray-400" : ""}>
                  {value ? format(new Date(value), "dd MMM yyyy") : placeholder}
                </span>
                <CalendarIcon className="h-4 w-4 opacity-60" />
              </div>
            </PopoverTrigger>

            {!readOnly && (
              <PopoverContent className="w-auto bg-white p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  captionLayout="dropdown"
                  fromYear={1950}
                  toYear={2075}
                  onSelect={(d) => {
                    onChange(d ? d.toISOString() : null);
                  }}
                />
              </PopoverContent>
            )}
          </Popover>

          <InlineError error={error?.message} />
        </div>
      )}
    />
  );
}
