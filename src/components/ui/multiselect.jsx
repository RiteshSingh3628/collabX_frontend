"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import classNames from "classnames";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, ChevronUp, X as RemoveIcon } from "lucide-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const MultiSelectContext = createContext(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = ({
  values,
  onValuesChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Normalize values to always be an array
  const normalizedValues = useMemo(
    () => (Array.isArray(values) ? values : []),
    [values]
  );

  const onValueChangeHandler = useCallback(
    (val) => {
      if (normalizedValues.includes(val)) {
        onValuesChange(normalizedValues.filter((item) => item !== val));
      } else {
        onValuesChange([...normalizedValues, val]);
      }
    },
    [normalizedValues, onValuesChange]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          nextIndex > normalizedValues.length - 1 ? (loop ? 0 : -1) : nextIndex
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? normalizedValues.length - 1 : prevIndex);
      };

      if (
        (e.key === "Backspace" || e.key === "Delete") &&
        normalizedValues.length > 0
      ) {
        if (inputValue.length === 0) {
          if (activeIndex !== -1 && activeIndex < normalizedValues.length) {
            onValuesChange(
              normalizedValues.filter(
                (item) => item !== normalizedValues[activeIndex]
              )
            );
            const newIndex = activeIndex - 1 < 0 ? 0 : activeIndex - 1;
            setActiveIndex(newIndex);
          } else {
            onValuesChange(
              normalizedValues.filter(
                (item) => item !== normalizedValues[normalizedValues.length - 1]
              )
            );
          }
        }
      } else if (e.key === "Enter") {
        setOpen(true);
      } else if (e.key === "Escape") {
        if (activeIndex !== -1) {
          setActiveIndex(-1);
        } else {
          setOpen(false);
        }
      } else if (dir === "rtl") {
        if (e.key === "ArrowRight") {
          movePrev();
        } else if (e.key === "ArrowLeft" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      } else {
        if (e.key === "ArrowLeft") {
          movePrev();
        } else if (e.key === "ArrowRight" && (activeIndex !== -1 || loop)) {
          moveNext();
        }
      }
    },
    [dir, normalizedValues, inputValue, activeIndex, loop, onValuesChange]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value: normalizedValues,
        onValueChange: onValueChangeHandler,
        open,
        setOpen,
        inputValue,
        setInputValue,
        activeIndex,
        setActiveIndex,
      }}
    >
      <Command
        onKeyDown={handleKeyDown}
        className={`flex flex-col overflow-visible bg-transparent ${className}`}
        dir={dir}
        {...props}
      >
        {children}
      </Command>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorTrigger = forwardRef(
  (
    { className, children, itemMap, showSingleAsPlaceholder, ...props },
    ref
  ) => {
    const { value, onValueChange, activeIndex, open, setOpen } =
      useMultiSelect();

    const mousePreventDefault = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    return (
      <div
        ref={ref}
        className={`border-muted bg-background border-color-secondary-light relative flex flex-wrap gap-2 rounded-lg border py-2 ps-3 pe-5 ${className}`}
        {...props}
      >
        {(Array.isArray(value) ? value : []).map((item, index) => (
          <Badge
            key={item} // Assuming item is a string or primitive type
            className={classNames("flex items-center gap-1 rounded-xl px-1", {
              "ring-muted-foreground ring-2": activeIndex === index,
            })}
            variant={"secondary"}
          >
            <span className="text-xs">{itemMap ? itemMap[item] : item}</span>
            <button
              aria-label={`Remove ${item} option`}
              aria-roledescription="button to remove option"
              type="button"
              onMouseDown={mousePreventDefault}
              onClick={() => onValueChange(item)}
            >
              <span className="sr-only">Remove {item} option</span>
              <RemoveIcon className="hover:stroke-destructive h-4 w-4 cursor-pointer" />
            </button>
          </Badge>
        ))}
        {children}
        <span
          className="absolute end-3 top-3 cursor-pointer transition-transform hover:scale-110"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          onMouseDown={mousePreventDefault}
        >
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </div>
    );
  }
);

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue, activeIndex, setActiveIndex } =
    useMultiSelect();

  return (
    <CommandPrimitive.Input
      {...props}
      ref={ref}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={classNames(
        `placeholder:text-muted-foreground flex-1 bg-transparent outline-hidden ${className}`,
        {
          "caret-transparent": activeIndex !== -1,
        }
      )}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <div ref={ref} className="relative">
      {open && children}
    </div>
  );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={`scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground dark:scrollbar-thumb-muted scrollbar-thumb-rounded-lg border-muted border-color-secondary-light absolute top-0 z-10 flex w-full flex-col gap-2 rounded-md border bg-white p-2 shadow-md transition-colors ${className}`}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: Options, onValueChange, setInputValue } = useMultiSelect();

    const mousePreventDefault = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const isIncluded = Array.isArray(Options) && Options.includes(value);
    return (
      <CommandItem
        ref={ref}
        {...props}
        onSelect={() => {
          onValueChange(value);
          setInputValue("");
        }}
        className={classNames(
          `flex cursor-pointer justify-between rounded-md px-2 py-1 transition-colors ${className}`,
          { "cursor-default opacity-50": isIncluded },
          { "cursor-not-allowed opacity-50": props.disabled }
        )}
        onMouseDown={mousePreventDefault}
      >
        {children}
        {isIncluded && <Check className="h-4 w-4" />}
      </CommandItem>
    );
  }
);

MultiSelectorItem.displayName = "MultiSelectorItem";

export {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
};
