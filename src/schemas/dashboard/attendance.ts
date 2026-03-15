import { z } from "zod"

export const attendanceEntrySchema = z.object({
    student: z.string().min(1),
    status: z.enum(["present", "absent", "late", "excused"]),
    remarks: z.string().optional(),
})

export const bulkAttendanceSchema = z.object({
    classId: z.string().min(1, "Class is required"),
    date: z.string().min(1, "Date is required"),
    entries: z.array(attendanceEntrySchema).min(1, "At least one entry is required"),
})

export type BulkAttendanceFormData = z.infer<typeof bulkAttendanceSchema>

export const attendanceCorrectionSchema = z.object({
    status: z.enum(["present", "absent", "late", "excused"]),
    remarks: z.string().optional(),
})

export type AttendanceCorrectionData = z.infer<typeof attendanceCorrectionSchema>
