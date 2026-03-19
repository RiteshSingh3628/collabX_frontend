import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({
  className,
  type,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-slate-200 file:text-foreground placeholder:text-slate-500 selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:outline-none focus:bg-white focus:border-primary border",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      ref={ref}
      {...props} />
  );
});

Input.displayName = "Input";

export { Input }
