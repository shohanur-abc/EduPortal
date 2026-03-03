import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
    rememberMe: z.boolean().optional(),
})

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters" })
            .trim(),
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[a-zA-Z]/, { message: "Must contain at least one letter", })
            .regex(/[0-9]/, { message: "Must contain at least one number", })
            .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character", }),
        confirmPassword: z.string(),
        role: z.enum(["admin", "principal", "teacher", "student", "parent",]),
        acceptTerms: z.literal(true, {
            error: "You must accept the terms",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
})

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[a-zA-Z]/, { message: "Must contain at least one letter", })
            .regex(/[0-9]/, { message: "Must contain at least one number", })
            .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one special character", }),
        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const verifyEmailSchema = z.object({
    code: z.string().length(6, { message: "Code must be 6 digits" }),
    email: z.string(),
})

export const mfaVerifySchema = z.object({
    code: z.string().length(6, { message: "Code must be 6 digits" }),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
export type MfaVerifyInput = z.infer<typeof mfaVerifySchema>
