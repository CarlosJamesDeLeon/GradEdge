// /components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost";
    size?: "default" | "sm";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-semibold rounded-lg",
                    "transition-all duration-200 focus:outline-none",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    // Primary — Academic Gold
                    variant === "primary" && [
                        "bg-[#C5A059] text-[#000c1a]",
                        "hover:bg-[#d4b06a] hover:-translate-y-0.5",
                        "shadow-[0_4px_24px_rgba(197,160,89,0.35)]",
                        "hover:shadow-[0_8px_32px_rgba(197,160,89,0.5)]",
                    ],
                    // Ghost — subtle outline
                    variant === "ghost" && [
                        "bg-transparent border border-white/12 text-white/60",
                        "hover:bg-white/6 hover:text-white/90 hover:border-white/20",
                    ],
                    size === "default" && "h-11 px-6 text-sm tracking-wide",
                    size === "sm" && "h-9 px-4 text-xs",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };