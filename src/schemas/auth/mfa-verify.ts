import z from "zod";

export const mfaVerifySchema = z.object({
    code: z.string().length(6, { message: "Code must be 6 digits" }),
})

export type MfaVerifyInput = z.infer<typeof mfaVerifySchema>
