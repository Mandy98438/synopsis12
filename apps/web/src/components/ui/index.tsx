"use client";
// ─────────────────────────────────────────────
// KARD — UI Primitives
// FIX: Removed duplicate Toast/Spinner definitions
//      Added 'prefix' prop to Input
//      Added 'xs' size to Spinner
// ─────────────────────────────────────────────

import { forwardRef, createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

// ── Button ────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-[#ff6600] hover:bg-[#e65c00] text-white border-transparent shadow-[var(--shadow-sm)]",
      secondary: "bg-white hover:bg-[#f6f3ee] text-black border-black",
      ghost: "bg-transparent hover:bg-[#f6f3ee] text-[#666] hover:text-black border-transparent",
      danger: "bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-300",
    };
    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-lg",
      md: "text-sm px-5 py-2.5 rounded-[24px]",
      lg: "text-sm px-7 py-3.5 rounded-[24px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// ── Input ─────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string; // FIX: Added prefix prop (used for kard.io/ display)
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[11px] text-[#888] uppercase font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3.5 text-sm text-[#444] pointer-events-none select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-[16px] bg-white border text-sm text-black placeholder:text-[#aaa] outline-none transition-colors",
              prefix && "pl-[calc(3.5rem_*_var(--prefix-len,1))]",
              error
                ? "border-red-500/40 focus:border-red-500/70"
                : "border-[#e5e5e5] focus:border-black",
              className
            )}
            style={prefix ? { paddingLeft: `${prefix.length * 7.5 + 14}px` } : undefined}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-[11px] text-[#888]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// ── Textarea ──────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-[11px] text-[#888] uppercase font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-[16px] bg-white border text-sm text-black placeholder:text-[#aaa] outline-none transition-colors resize-none",
            error
              ? "border-red-500/40 focus:border-red-500/70"
              : "border-[#e5e5e5] focus:border-black",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-[11px] text-[#888]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ── Badge ─────────────────────────────────────
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "orange";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variants = {
    default: "bg-[#f6f3ee] text-[#666] border-[#e5e5e5]",
    success: "bg-[#ebfef6] text-[#00885a] border-[#00cc88]/25",
    warning: "bg-[#fff3e8] text-[#ff6600] border-[#ff6600]/20",
    error: "bg-red-50 text-red-600 border-red-200",
    orange: "bg-[#ff6600] text-white border-transparent",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

// ── Spinner ───────────────────────────────────
// FIX: Added 'xs' size used in CardBuilder
export function Spinner({ size = "md", className }: { size?: "xs" | "sm" | "md" | "lg"; className?: string }) {
  const sizes = { xs: "w-2.5 h-2.5", sm: "w-3 h-3", md: "w-4 h-4", lg: "w-6 h-6" };
  return (
    <svg
      className={cn("animate-spin text-current", sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Toast ─────────────────────────────────────
type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

const ToastContext = createContext<{
  toast: (message: string, type?: ToastType) => void;
}>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-[100] pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "px-4 py-3 rounded-xl text-sm font-medium border shadow-xl pointer-events-auto toast-enter",
              t.type === "success" && "bg-[#0f2a0f] text-[#4CAF50] border-[#1a4a1a]",
              t.type === "error" && "bg-[#2a0f0f] text-red-400 border-[#4a1a1a]",
              t.type === "info" && "bg-[#141414] text-[#aaa] border-[#222]"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

