"use client";

import { FieldLabel, InlineError } from "@/components/talent-ui";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";

import { useCallback } from "react";
import { Controller } from "react-hook-form";

function MultiSelectDropdown({
  className = "",
  control,
  errors,
  isRequired = false,
  label,
  name,
  options,
  placeholder = "Select value",
  requireItemMap = true,
  ...props
}) {
  // Helper: normalize value ID for both {id, name} and {value, label} formats
  const getId = useCallback((item) => {
    return item?.value ?? item?.id ?? item?._id;
  }, []);

  // Helper: get display name for both formats
  const getName = useCallback((item) => {
    return item?.label ?? item?.name;
  }, []);

  // Build item map for selected values (maps IDs to display names)
  const getValueMap = useCallback(
    (values) => {
      if (!Array.isArray(values)) return {};
      return values.reduce((acc, value) => {
        const matchedItem = options?.find((item) => getId(item) === value);
        if (matchedItem) acc[value] = getName(matchedItem);
        return acc;
      }, {});
    },
    [options, getId, getName]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        // Normalize field.value to ensure it only contains primitive IDs
        const normalizedValue = Array.isArray(field.value)
          ? field.value.map((item) => {
              // If item is an object, extract its ID; otherwise use as-is
              return typeof item === "object" && item !== null
                ? getId(item)
                : item;
            })
          : [];

        return (
          <div className={`flex w-full flex-col gap-1 ${className}`}>
            <FieldLabel
              className="text-sm font-medium text-slate-500"
              label={label}
              isRequired={isRequired}
            />

            <MultiSelector
              values={normalizedValue}
              onValuesChange={field.onChange}
              {...props}
            >
              <MultiSelectorTrigger
                className="text-color-secondary-default h-full min-h-11 rounded-none text-sm"
                itemMap={requireItemMap ? getValueMap(normalizedValue) : null}
              >
                <MultiSelectorInput
                  className="cursor-pointer placeholder:text-gray-600"
                  placeholder={placeholder}
                />
              </MultiSelectorTrigger>

              <MultiSelectorContent className="border-color-secondary-light border bg-white font-medium">
                <MultiSelectorList>
                  {options?.map((option, index) => (
                    <MultiSelectorItem
                      className="data-[selected=true]:!bg-color-primary hover:!bg-color-primary cursor-pointer aria-selected:text-white!"
                      key={index}
                      value={getId(option)}
                    >
                      {getName(option)}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>

            <InlineError errors={errors} name={name} />
          </div>
        );
      }}
    />
  );
}

export default MultiSelectDropdown;
