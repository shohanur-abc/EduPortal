import z from "zod";

export const verifyEmailSchema = z.object({
    code: z.string().length(6, { message: "Code must be 6 digits" }),
    email: z.string(),
})

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
