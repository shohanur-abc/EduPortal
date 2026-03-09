import { z } from "zod"

export const studentSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    rollNumber: z.string().min(1, "Roll number is required"),
    classId: z.string().min(1, "Class is required"),
    section: z.string().min(1, "Section is required"),
    guardianName: z.string().min(2, "Guardian name is required"),
    guardianPhone: z.string().min(5, "Guardian phone is required"),
    guardianEmail: z.string().email().optional().or(z.literal("")),
    dateOfBirth: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    status: z.enum(["active", "inactive", "graduated", "transferred"]),
})

export type StudentFormData = z.infer<typeof studentSchema>
