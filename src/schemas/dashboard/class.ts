import { z } from "zod"

export const classSchema = z.object({
    name: z.string().min(1, "Class name is required"),
    section: z.string().min(1, "Section is required"),
    grade: z.coerce.number().min(1).max(12),
    academicYear: z.string().min(1, "Academic year is required"),
    classTeacher: z.string().optional(),
    maxStudents: z.coerce.number().min(1).max(100).optional(),
    subjects: z.array(z.string()).optional(),
    room: z.string().optional(),
    status: z.enum(["active", "inactive"]),
})

export type ClassFormData = z.infer<typeof classSchema>
