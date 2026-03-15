import { z } from "zod"

export const userRoleSchema = z.object({
    role: z.enum(["admin", "principal", "teacher", "student", "parent"]),
})

export type UserRoleFormData = z.infer<typeof userRoleSchema>
