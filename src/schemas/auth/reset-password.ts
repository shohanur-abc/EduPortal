import z from "zod";

export const resetPasswordSchema = z
    .object({
        password: z.string()
            .min(8, {
                message: "Password must be at least 8 characters"
            })
            .regex(/[a-zA-Z]/, {
                message: "Must contain at least one letter",
            })
            .regex(/[0-9]/, {
                message: "Must contain at least one number",
            })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Must contain at least one special character",
            }),

        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
