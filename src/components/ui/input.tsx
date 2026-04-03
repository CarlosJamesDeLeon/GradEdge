// /components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-lg px-4 py-2 text-sm",
                    "bg-white/5 border border-white/10",
                    "text-[#F0EDE6] placeholder:text-white/25",
                    "transition-colors duration-150",
                    "focus:outline-none focus:border-[#C5A059]/60 focus:bg-white/8",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };