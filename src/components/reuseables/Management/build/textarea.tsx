import * as React from "react"
import { cn } from "@/lib/utils"

// Textarea Component - Reusable textarea component
// Cung cấp textarea đẹp mắt cho các form fields dài

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm",
                    "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                    "border-gray-300 dark:border-gray-600",
                    "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "transition-colors duration-200",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }