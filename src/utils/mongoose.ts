
// Helper to safely read a populated field
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pop = (field: unknown, key: string): string => (field as any)?.[key] ?? ""


// Helper to serialize mongoose docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sid = (doc: any): string => String(doc._id ?? doc.id ?? "")
