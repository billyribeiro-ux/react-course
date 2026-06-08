import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

// cva defines variants once, with a typed API. Each variant maps to classes;
// `defaultVariants` fills in the common case.
const buttonVariants = cva(
  // base classes applied to every button
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-fg hover:bg-brand-hover",
        secondary: "bg-surface text-fg border border-border hover:bg-bg",
        danger: "bg-danger text-danger-fg hover:opacity-90",
        ghost: "bg-transparent text-fg hover:bg-surface",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
