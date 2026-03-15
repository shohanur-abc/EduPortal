import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility to merge class names (handles conditional classes and Tailwind conflicts)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Maps a 0–100 percentage to a red→green color (smooth HSL transition)
// 0% → red (hue 0°), 100% → green (hue 120°)
export function percentColor(value: number): string {
  const clamped = Math.max(0, Math.min(100, value))
  const hue = (clamped / 100) * 120
  return `hsl(${hue} 80% 42%)`
}

// Helper to safely format a date (handles Date objects and strings)
export const fmtDate = (d: unknown): string => {
  if (!d) return ""
  if (d instanceof Date) return d.toISOString().split("T")[0]
  return String(d).split("T")[0]
}


export const success = (message: string, obj?: Record<string, unknown>) => ({ success: true, message, ...obj } as const)
export const error = (error: string, obj?: Record<string, unknown>) => ({ success: false, error, ...obj } as const)
