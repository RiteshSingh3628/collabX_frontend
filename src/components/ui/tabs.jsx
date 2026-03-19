"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

const TabsContext = React.createContext(null);

function Tabs({ value, onValueChange, children, className, ...props }) {
  const handleTabChange = React.useCallback(
    (newValue) => {
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleTabChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue, onValueChange } = React.useContext(TabsContext);
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:border-primary data-[state=active]:text-primary h-full border-b-2 border-transparent px-4 py-1.5 data-[state=active]:font-semibold data-[state=inactive]:text-gray-600",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: activeValue } = React.useContext(TabsContext);
    const isActive = activeValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isActive ? "active" : "inactive"}
        className={cn("mt-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsContent, TabsList, TabsTrigger };
