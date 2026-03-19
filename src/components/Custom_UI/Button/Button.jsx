
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const ButtonWrapper = ({
  className,
  label,
  icon = false,
  isSubmitting = false,
  disabled = false,
  disabledTooltip = null,
  tooltipSide = "top",
  variant,
  ...props
}) => {
  const isVariantOutline = variant === "outline";

  return (
    <Button
      {...props}
      variant={variant}
      disabled={disabled}
      className={cn("rounded-none", className, {
        "relative flex": icon,
        "pr-6": icon,
        "bg-zinc-200 text-neutral-700": disabled,
      })}
    >
      {label}
      {icon && (
        <ArrowRight className="transform pt-0.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      )}
    </Button>
  );
};

export default ButtonWrapper;
