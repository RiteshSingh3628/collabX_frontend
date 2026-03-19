import * as React from 'react';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center border-1 border-gray-300 px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-1 text-slate-500',
        secondary:
          'border bg-white text-gray-900 hover:bg-slate-100/80 ',
        destructive:
          'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80',
        outline: 'text-slate-950 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={`${badgeVariants({ variant })} ${className}`} {...props} />
  );
}

export { Badge, badgeVariants };
