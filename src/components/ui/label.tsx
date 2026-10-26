import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)
type ExtraProps = { required?: boolean; requiredLabel?: string };
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & ExtraProps
>(({ className, required, requiredLabel, children, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className)}
        {...props}
    >
        {children}
        {required && (
            <>
                <span className="ml-1 text-red-500" aria-hidden="true">*</span>
                {requiredLabel && <span className="sr-only">{requiredLabel}</span>}
            </>
        )}
    </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
