import z from "zod";

export const signupSchema = z.object({
    // Account step
    email: z.string().email({
        message: "Please enter a valid email"
    }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters"
        })
        .regex(/[a-zA-Z]/, {
            message: "Must contain at least one letter"
        })
        .regex(/[0-9]/, {
            message: "Must contain at least one number"
        })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Must contain at least one special character"
        }),

    confirmPassword: z.string(),

    role: z.enum(["admin", "principal", "teacher", "student", "parent"]),

    acceptTerms: z.literal(true, { error: "You must accept the terms" }),
    // Profile step
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters"
    }).trim(),

    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters"
    }).trim(),

    username: z
        .string()
        .min(3, {
            message: "Username must be at least 3 characters"
        })
        .regex(/^[a-z0-9_-]+$/, {
            message: "Only lowercase letters, numbers, hyphens and underscores"
        }),

    dateOfBirth: z.string().optional(),

    gender: z.enum(["male", "female", "other"], {
        message: "Please select a gender"
    }),

    avatar: z.string().optional(),

}).refine((data) => data.password === data.confirmPassword, {

    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type SignupInput = z.infer<typeof signupSchema>
