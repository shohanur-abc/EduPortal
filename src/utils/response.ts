export const success = (message: string, obj?: Record<string, unknown>) => ({ success: true, message, ...obj } as const)
export const error = (error: string, obj?: Record<string, unknown>) => ({ success: false, error, ...obj } as const)
