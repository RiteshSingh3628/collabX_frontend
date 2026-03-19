"use client"

import { useCallback, useState } from "react"
import { Controller } from "react-hook-form"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InlineError } from "@/components/talent-ui"

export default function Combobox({
  className = "",
  control,
  errors,
  isRequired = false,
  label,
  name,
  placeholder,
  options = [],
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  disabled = false,
  ...props
}) {
  const [open, setOpen] = useState(false)


  const filter = useCallback(
    (itemValue, search) => {
      const opt = options.find((o) => String(o.value) === String(itemValue))
      if (!opt) return 0
      const hay = (opt.label + " " + String(opt.value)).toLowerCase()
      const needle = (search || "").toLowerCase()
      return hay.includes(needle) ? 1 : 0
    },
    [options]
  )

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: isRequired ? "This field is required" : false }}
      render={({ field, fieldState }) => {
        const value = field.value ? String(field.value) : ""
        const selected = value
          ? options.find((o) => String(o.value) === value)
          : null

        const handleSelect = (nextValue) => {
          const next = String(nextValue)
          if (next && next !== value) {
            field.onChange(next)
          }
          setOpen(false)
        }

        return (
          <div className={cn("flex w-full min-w-24 flex-col gap-1", className)}>
            {label && (
              <label
                htmlFor={name}
                className="block text-sm font-medium tracking-wide text-gray-500"
              >
                {label}
                {isRequired && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
            )}

            <div className="relative flex flex-grow items-center">
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      'min-h-11 w-full justify-between rounded-none border border-slate-300 text-base font-normal focus:border-primary focus:bg-white focus:outline-none disabled:opacity-100',
                      {
                        'text-slate-500': !selected,
                        'border-red-500': fieldState?.error,
                        'text-slate-500 cursor-not-allowed': disabled,
                      }
                    )}
                    disabled={disabled}
                    {...props}
                  >
                    <span
                      className={cn(
                        selected
                          ? 'text-slate-700 text-sm'
                          : 'text-slate-500 placeholder:text-slate-400 text-sm'
                      )}
                    >
                      {selected ? selected.label : placeholder ?? label}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  className="w-[var(--radix-popover-trigger-width)] p-0 border pointer-events-auto bg-white font-medium"
                >
                  <Command filter={filter} shouldFilter={true}>
                    <CommandInput
                      placeholder={searchPlaceholder}
                      className="h-9 border-b border-slate-100 text-sm focus:outline-none"
                      onKeyDown={(e) => {e.stopPropagation()}}
                      onKeyUp={(e) => {e.stopPropagation()}}
                      onInput={(e) => {  e.stopPropagation()}}
                    />
                    <CommandList className="overflow-y-auto pointer-events-auto max-h-[300px]">
                      <CommandEmpty>{emptyText}</CommandEmpty>
                      <CommandGroup>
                        {options.map((opt) => (
                          <CommandItem
                            key={opt.value}
                            value={String(opt.value)}
                            onSelect={handleSelect}
                            className={cn(
                              'cursor-pointer rounded-none hover:bg-primary/10 text-slate-700 data-[selected=true]:!bg-blue-100 data-[selected=true]:!text-primary',
                              value === String(opt.value) && 'bg-blue-100 font-medium'
                            )}
                          >
                            {opt.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === String(opt.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <InlineError errors={errors} name={name} />
          </div>
        )
      }}
    />
  )
}
