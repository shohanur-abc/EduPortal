import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility to merge class names (handles conditional classes and Tailwind conflicts)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to safely format a date (handles Date objects and strings)
export const fmtDate = (d: unknown): string => {
  if (!d) return ""
  if (d instanceof Date) return d.toISOString().split("T")[0]
  return String(d).split("T")[0]
}