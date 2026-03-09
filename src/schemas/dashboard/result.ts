import { z } from "zod"

export const resultSchema = z.object({
    student: z.string().min(1, "Student is required"),
    classId: z.string().min(1, "Class is required"),
    exam: z.string().min(1, "Exam name is required"),
    subject: z.string().min(1, "Subject is required"),
    marks: z.coerce.number().min(0, "Marks cannot be negative"),
    totalMarks: z.coerce.number().positive("Total marks must be positive"),
    academicYear: z.string().min(1, "Academic year is required"),
    remarks: z.string().optional(),
})

export type ResultFormData = z.infer<typeof resultSchema>
