/**
 * Format a date-like value into a string.
 *
 * @param data$ - Date value (Date | string | number | unknown)
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * fmtDate(new Date())
 * // "2026-03-09"
 *
 * @example
 * fmtDate("2026-03-09T10:30:00Z", { format: "dmy" })
 * // "09-03-2026"
 *
 * @example
 * fmtDate("2026-03-09", { format: "dmy", separator: "/" })
 * // "09/03/2026"
 */

export const fmtDate = (
    data$: unknown,
    { format = "iso", separator = "-", fallback = "" }: FmtDateOptions = {}
): string => {
    if (!data$) return fallback

    const date = data$ instanceof Date ? data$ : new Date(String(data$))
    if (isNaN(date.getTime())) return fallback

    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")

    switch (format) {
        case "dmy": return [d, m, y].join(separator)
        case "mdy": return [m, d, y].join(separator)
        case "ymd":
        case "iso":
        default: return [y, m, d].join(separator)
    }
}

type DateFormat = "iso" | "ymd" | "dmy" | "mdy"

interface FmtDateOptions {
    format?: DateFormat
    separator?: string
    fallback?: string
}
