import z from "zod";

export const signupSchema = z.object({
    name: z.string().trim()
        .min(2, {
            message: "Name must be at least 2 characters"
        }),

    email: z.string().email({
        message: "Please enter a valid email"
    }),

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

    role: z.enum(["admin", "principal", "teacher", "student", "parent",]),

    acceptTerms: z.literal(true, {
        error: "You must accept the terms",
    }),
})

    .refine((data) => data.password === data.confirmPassword, {

        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type SignupInput = z.infer<typeof signupSchema>
