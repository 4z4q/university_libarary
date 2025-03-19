import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const loadingVariants = cva("relative inline-flex items-center justify-center rounded-full", {
  variants: {
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
      success: "text-green-500",
      outline: "text-foreground",
    },
    size: {
      xs: "h-4 w-4",
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    type: {
      spinner: "",
      dots: "",
      pulse: "",
      gradient: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    type: "spinner",
  },
})

export interface CircularLoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  label?: string
}

export function CircularLoading({
  className,
  variant,
  size,
  type = "spinner",
  label = "Loading...",
  ...props
}: CircularLoadingProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(loadingVariants({ variant, size, type }), className)}
      {...props}
    >
      {type === "spinner" && (
        <div
          className={cn(
            "absolute h-full w-full rounded-full border-2 border-current border-r-transparent animate-spin",
            size === "xs" && "border-[1.5px]",
            size === "sm" && "border-2",
            size === "md" && "border-2",
            size === "lg" && "border-3",
            size === "xl" && "border-4",
          )}
        />
      )}

      {type === "dots" && (
        <div className="flex items-center justify-center space-x-1">
          <div
            className={cn(
              "rounded-full bg-current animate-bounce",
              size === "xs" && "h-1 w-1",
              size === "sm" && "h-1.5 w-1.5",
              size === "md" && "h-2 w-2",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-4 w-4",
              "animation-delay-0",
            )}
          />
          <div
            className={cn(
              "rounded-full bg-current animate-bounce",
              size === "xs" && "h-1 w-1",
              size === "sm" && "h-1.5 w-1.5",
              size === "md" && "h-2 w-2",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-4 w-4",
              "animation-delay-150",
            )}
          />
          <div
            className={cn(
              "rounded-full bg-current animate-bounce",
              size === "xs" && "h-1 w-1",
              size === "sm" && "h-1.5 w-1.5",
              size === "md" && "h-2 w-2",
              size === "lg" && "h-3 w-3",
              size === "xl" && "h-4 w-4",
              "animation-delay-300",
            )}
          />
        </div>
      )}

      {type === "pulse" && (
        <div
          className={cn(
            "rounded-full bg-current opacity-75 animate-ping",
            size === "xs" && "h-2 w-2",
            size === "sm" && "h-3 w-3",
            size === "md" && "h-4 w-4",
            size === "lg" && "h-6 w-6",
            size === "xl" && "h-8 w-8",
          )}
        />
      )}

      {type === "gradient" && (
        <div
          className={cn(
            "absolute h-full w-full rounded-full border-4 border-transparent animate-spin",
            size === "xs" && "border-[1.5px]",
            size === "sm" && "border-2",
            size === "md" && "border-2",
            size === "lg" && "border-3",
            size === "xl" && "border-4",
            variant === "default" && "bg-gradient-to-r from-transparent to-primary",
            variant === "secondary" && "bg-gradient-to-r from-transparent to-secondary",
            variant === "destructive" && "bg-gradient-to-r from-transparent to-destructive",
            variant === "success" && "bg-gradient-to-r from-transparent to-green-500",
            variant === "outline" && "bg-gradient-to-r from-transparent to-foreground",
          )}
          style={{
            maskImage: "radial-gradient(transparent 60%, black 70%)",
            WebkitMaskImage: "radial-gradient(transparent 60%, black 70%)",
          }}
        />
      )}

      <span className="sr-only">{label}</span>
    </div>
  )
}

