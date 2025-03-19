import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva("inline-block rounded-full border-current animate-spin", {
  variants: {
    variant: {
      default: "text-muted-foreground/20 border-r-primary",
      primary: "text-primary/20 border-r-primary",
      secondary: "text-secondary/20 border-r-secondary",
      destructive: "text-destructive/20 border-r-destructive",
      success: "text-green-200 border-r-green-500",
    },
    size: {
      xs: "h-4 w-4 border-2",
      sm: "h-6 w-6 border-2",
      md: "h-8 w-8 border-2",
      lg: "h-12 w-12 border-3",
      xl: "h-16 w-16 border-4",
    },
    speed: {
      slow: "animate-spin-slow",
      default: "animate-spin",
      fast: "animate-spin-fast",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    speed: "default",
  },
})

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinnerVariants> {
  label?: string
}

export function Spinner({ className, variant, size, speed, label = "Loading...", ...props }: SpinnerProps) {
  return (
    <div role="status" aria-label={label} className={cn("relative", className)} {...props}>
      <div className={cn(spinnerVariants({ variant, size, speed }))} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

