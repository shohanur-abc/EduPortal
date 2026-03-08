import { z } from "zod"

// ============= NOTICE =============
export const noticeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    content: z.string().min(10, "Content must be at least 10 characters"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    targetAudience: z.array(z.enum(["all", "admin", "teacher", "student", "parent"])).min(1, "Select at least one audience"),
    publishDate: z.string().optional(),
    expiryDate: z.string().optional(),
    status: z.enum(["draft", "published", "archived"]),
})
export type NoticeFormData = z.infer<typeof noticeSchema>

// ============= STUDENT =============
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

// ============= TEACHER =============
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

// ============= ATTENDANCE (bulk mark) =============
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

// single attendance correction
export const attendanceCorrectionSchema = z.object({
    status: z.enum(["present", "absent", "late", "excused"]),
    remarks: z.string().optional(),
})
export type AttendanceCorrectionData = z.infer<typeof attendanceCorrectionSchema>

// ============= FEE =============
export const feeSchema = z.object({
    student: z.string().min(1, "Student is required"),
    type: z.enum(["tuition", "exam", "library", "transport", "hostel", "other"]),
    amount: z.coerce.number().positive("Amount must be positive"),
    dueDate: z.string().min(1, "Due date is required"),
    academicYear: z.string().min(1, "Academic year is required"),
    month: z.string().min(1, "Month is required"),
    remarks: z.string().optional(),
})
export type FeeFormData = z.infer<typeof feeSchema>

export const feePaymentSchema = z.object({
    paidAmount: z.coerce.number().positive("Paid amount must be positive"),
    paymentMethod: z.enum(["cash", "card", "bank-transfer", "online", "cheque"]),
    paidDate: z.string().optional(),
    receiptNumber: z.string().optional(),
})
export type FeePaymentData = z.infer<typeof feePaymentSchema>

// ============= RESULT =============
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

// ============= CLASS =============
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

// ============= USER ROLE =============
export const userRoleSchema = z.object({
    role: z.enum(["admin", "principal", "teacher", "student", "parent"]),
})
export type UserRoleFormData = z.infer<typeof userRoleSchema>

// ============= MESSAGE =============
export const messageSchema = z.object({
    content: z.string().min(1, "Message cannot be empty").max(5000, "Message too long"),
    type: z.enum(["text", "image", "file", "system"]).default("text"),
    replyTo: z.string().optional().nullable(),
})
export type MessageFormData = z.infer<typeof messageSchema>

// ============= CONVERSATION =============
export const conversationSchema = z.object({
    name: z.string().max(100).optional(),
    type: z.enum(["direct", "group"]),
    description: z.string().max(500).optional(),
    participantIds: z.array(z.string()).min(1, "At least one participant is required"),
})
export type ConversationFormData = z.infer<typeof conversationSchema>
