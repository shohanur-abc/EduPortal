import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email"
    }),

    password: z.string().min(1, {
        message: "Password is required"
    }),

    rememberMe: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
