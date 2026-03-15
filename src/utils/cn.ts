import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**Utility to merge class names (handles conditional classes and Tailwind conflicts) */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}