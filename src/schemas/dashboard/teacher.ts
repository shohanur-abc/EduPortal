import { z } from "zod"

export const teacherSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Subject is required"),
    department: z.string().min(1, "Department is required"),
    qualification: z.string().optional(),
    status: z.enum(["active", "on-leave", "inactive"]),
})

export type TeacherFormData = z.infer<typeof teacherSchema>
