"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { Types } from "mongoose"
import { NoticeModel } from "@/models/notice"
import { StudentModel } from "@/models/student"
import { TeacherModel } from "@/models/teacher"
import { ClassModel } from "@/models/class"
import { AttendanceModel } from "@/models/attendance"
import { FeeModel } from "@/models/fee"
import { ResultModel } from "@/models/result"
import { UserModel } from "@/models/user"
import {
    noticeSchema,
    studentSchema,
    teacherSchema,
    bulkAttendanceSchema,
    attendanceCorrectionSchema,
    feeSchema,
    feePaymentSchema,
    resultSchema,
    classSchema,
    userRoleSchema,
    messageSchema,
    conversationSchema,
} from "@/features/dashboard/validators"

// Generic response shape
type ActionResult<T = unknown> =
    | { success: true; data?: T; message: string }
    | { success: false; error: string }

// ============================================================
//  NOTICE MUTATIONS
// ============================================================

export async function createNotice(raw: unknown): Promise<ActionResult> {
    const parsed = noticeSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const notice = await NoticeModel.create({
        ...parsed.data,
        author: "000000000000000000000000", // TODO: replace with session user id
        publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : new Date(),
        expiryDate: parsed.data.expiryDate ? new Date(parsed.data.expiryDate) : undefined,
    })

    revalidatePath("/dashboard/notices", "layout")
    return { success: true, data: { _id: String(notice._id) }, message: "Notice created successfully" }
}

export async function updateNotice(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = noticeSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(
        id,
        {
            ...parsed.data,
            publishDate: parsed.data.publishDate ? new Date(parsed.data.publishDate) : undefined,
            expiryDate: parsed.data.expiryDate ? new Date(parsed.data.expiryDate) : undefined,
        },
        { new: true }
    )
    if (!notice) return { success: false, error: "Notice not found" }

    revalidatePath("/dashboard/notices", "layout")
    return { success: true, message: "Notice updated successfully" }
}

export async function deleteNotice(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndDelete(id)
    if (!notice) return { success: false, error: "Notice not found" }

    revalidatePath("/dashboard/notices", "layout")
    return { success: true, message: "Notice deleted successfully" }
}

export async function publishNotice(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(
        id,
        { status: "published", publishDate: new Date() },
        { new: true }
    )
    if (!notice) return { success: false, error: "Notice not found" }

    revalidatePath("/dashboard/notices", "layout")
    return { success: true, message: "Notice published successfully" }
}

export async function archiveNotice(id: string): Promise<ActionResult> {
    await connectDB()
    const notice = await NoticeModel.findByIdAndUpdate(id, { status: "archived" }, { new: true })
    if (!notice) return { success: false, error: "Notice not found" }

    revalidatePath("/dashboard/notices", "layout")
    return { success: true, message: "Notice archived successfully" }
}

// ============================================================
//  STUDENT MUTATIONS
// ============================================================

export async function createStudent(raw: unknown): Promise<ActionResult> {
    const parsed = studentSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const student = await StudentModel.create(parsed.data)

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, data: { _id: String(student._id) }, message: "Student created successfully" }
}

export async function updateStudent(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = studentSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const student = await StudentModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!student) return { success: false, error: "Student not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Student updated successfully" }
}

export async function deleteStudent(id: string): Promise<ActionResult> {
    await connectDB()
    const student = await StudentModel.findByIdAndDelete(id)
    if (!student) return { success: false, error: "Student not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Student deleted successfully" }
}

// ============================================================
//  TEACHER MUTATIONS
// ============================================================

export async function createTeacher(raw: unknown): Promise<ActionResult> {
    const parsed = teacherSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const teacher = await TeacherModel.create(parsed.data)

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, data: { _id: String(teacher._id) }, message: "Teacher created successfully" }
}

export async function updateTeacher(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = teacherSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const teacher = await TeacherModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!teacher) return { success: false, error: "Teacher not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Teacher updated successfully" }
}

export async function deleteTeacher(id: string): Promise<ActionResult> {
    await connectDB()
    const teacher = await TeacherModel.findByIdAndDelete(id)
    if (!teacher) return { success: false, error: "Teacher not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Teacher deleted successfully" }
}

// ============================================================
//  CLASS MUTATIONS
// ============================================================

export async function createClass(raw: unknown): Promise<ActionResult> {
    const parsed = classSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const cls = await ClassModel.create(parsed.data)

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, data: { _id: String(cls._id) }, message: "Class created successfully" }
}

export async function updateClass(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = classSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const cls = await ClassModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!cls) return { success: false, error: "Class not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Class updated successfully" }
}

export async function deleteClass(id: string): Promise<ActionResult> {
    await connectDB()
    const cls = await ClassModel.findByIdAndDelete(id)
    if (!cls) return { success: false, error: "Class not found" }

    revalidatePath("/dashboard/operations", "layout")
    return { success: true, message: "Class deleted successfully" }
}

// ============================================================
//  ATTENDANCE MUTATIONS
// ============================================================

export async function markBulkAttendance(raw: unknown): Promise<ActionResult> {
    const parsed = bulkAttendanceSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const { classId, date, entries } = parsed.data
    const dateObj = new Date(date)
    dateObj.setHours(0, 0, 0, 0)

    // Upsert each entry (update if exists for same student+date, else create)
    const ops = entries.map((entry) => ({
        updateOne: {
            filter: { student: new Types.ObjectId(entry.student), date: dateObj },
            update: {
                $set: {
                    classId: new Types.ObjectId(classId),
                    status: entry.status,
                    remarks: entry.remarks || "",
                    markedBy: new Types.ObjectId("000000000000000000000000"), // TODO: session user id
                },
            },
            upsert: true,
        },
    }))

    await AttendanceModel.bulkWrite(ops as Parameters<typeof AttendanceModel.bulkWrite>[0])

    revalidatePath("/dashboard/attendance", "layout")
    return { success: true, message: `Attendance marked for ${entries.length} students` }
}

export async function correctAttendance(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = attendanceCorrectionSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const record = await AttendanceModel.findByIdAndUpdate(id, parsed.data, { new: true })
    if (!record) return { success: false, error: "Attendance record not found" }

    revalidatePath("/dashboard/attendance", "layout")
    return { success: true, message: "Attendance corrected successfully" }
}

export async function deleteAttendance(id: string): Promise<ActionResult> {
    await connectDB()
    const record = await AttendanceModel.findByIdAndDelete(id)
    if (!record) return { success: false, error: "Attendance record not found" }

    revalidatePath("/dashboard/attendance", "layout")
    return { success: true, message: "Attendance record deleted" }
}

// ============================================================
//  FEE MUTATIONS
// ============================================================

export async function createFee(raw: unknown): Promise<ActionResult> {
    const parsed = feeSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const fee = await FeeModel.create({
        ...parsed.data,
        dueDate: new Date(parsed.data.dueDate),
    })

    revalidatePath("/dashboard/fees", "layout")
    return { success: true, data: { _id: String(fee._id) }, message: "Fee record created successfully" }
}

export async function recordFeePayment(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = feePaymentSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const fee = await FeeModel.findById(id)
    if (!fee) return { success: false, error: "Fee record not found" }

    const newPaidAmount = fee.paidAmount + parsed.data.paidAmount
    const newStatus = newPaidAmount >= fee.amount ? "paid" : "partial"

    await FeeModel.findByIdAndUpdate(id, {
        paidAmount: newPaidAmount,
        paidDate: parsed.data.paidDate ? new Date(parsed.data.paidDate) : new Date(),
        paymentMethod: parsed.data.paymentMethod,
        receiptNumber: parsed.data.receiptNumber || undefined,
        status: newStatus,
    })

    revalidatePath("/dashboard/fees", "layout")
    return { success: true, message: `Payment of ৳${parsed.data.paidAmount} recorded — status: ${newStatus}` }
}

export async function waiveFee(id: string): Promise<ActionResult> {
    await connectDB()
    const fee = await FeeModel.findByIdAndUpdate(id, { status: "waived" }, { new: true })
    if (!fee) return { success: false, error: "Fee record not found" }

    revalidatePath("/dashboard/fees", "layout")
    return { success: true, message: "Fee waived successfully" }
}

export async function deleteFee(id: string): Promise<ActionResult> {
    await connectDB()
    const fee = await FeeModel.findByIdAndDelete(id)
    if (!fee) return { success: false, error: "Fee record not found" }

    revalidatePath("/dashboard/fees", "layout")
    return { success: true, message: "Fee record deleted" }
}

// ============================================================
//  RESULT MUTATIONS
// ============================================================

export async function createResult(raw: unknown): Promise<ActionResult> {
    const parsed = resultSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const result = await ResultModel.create(parsed.data)

    revalidatePath("/dashboard/results", "layout")
    return { success: true, data: { _id: String(result._id) }, message: "Result entered successfully" }
}

export async function updateResult(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = resultSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    // Use save() to trigger pre-save middleware (grade calculation)
    const result = await ResultModel.findById(id)
    if (!result) return { success: false, error: "Result not found" }

    Object.assign(result, parsed.data)
    await result.save()

    revalidatePath("/dashboard/results", "layout")
    return { success: true, message: "Result updated successfully" }
}

export async function deleteResult(id: string): Promise<ActionResult> {
    await connectDB()
    const result = await ResultModel.findByIdAndDelete(id)
    if (!result) return { success: false, error: "Result not found" }

    revalidatePath("/dashboard/results", "layout")
    return { success: true, message: "Result deleted successfully" }
}

export async function bulkCreateResults(entries: unknown[]): Promise<ActionResult> {
    const results = entries.map((e) => resultSchema.safeParse(e))
    const errors = results.filter((r) => !r.success)
    if (errors.length > 0) return { success: false, error: `${errors.length} entries have validation errors` }

    await connectDB()
    const docs = results.map((r) => (r as { success: true; data: unknown }).data)
    await ResultModel.insertMany(docs)

    revalidatePath("/dashboard/results", "layout")
    return { success: true, message: `${docs.length} results entered successfully` }
}

// ============================================================
//  USER MUTATIONS
// ============================================================

export async function updateUserRole(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = userRoleSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    await connectDB()
    const user = await UserModel.findByIdAndUpdate(id, { role: parsed.data.role }, { new: true })
    if (!user) return { success: false, error: "User not found" }

    revalidatePath("/dashboard/roles", "layout")
    revalidatePath("/dashboard/users", "layout")
    return { success: true, message: `User role updated to ${parsed.data.role}` }
}

export async function deleteUser(id: string): Promise<ActionResult> {
    await connectDB()
    const user = await UserModel.findByIdAndDelete(id)
    if (!user) return { success: false, error: "User not found" }

    revalidatePath("/dashboard/roles", "layout")
    revalidatePath("/dashboard/users", "layout")
    return { success: true, message: "User deleted successfully" }
}

// ============================================================
//  MESSAGE MUTATIONS
// ============================================================

export async function sendMessageAction(raw: unknown): Promise<ActionResult> {
    const parsed = messageSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    const { conversationId, senderId, ...rest } = raw as {
        conversationId: string
        senderId: string
        content: string
        type?: string
        replyTo?: string | null
    }

    if (!conversationId || !senderId) return { success: false, error: "Conversation ID and Sender ID are required" }

    try {
        await connectDB()
        const { postMessage: send } = await import("@/services/messages/post-message")
        const message = await send({ conversationId, senderId, content: parsed.data.content, type: parsed.data.type, replyTo: parsed.data.replyTo })
        revalidatePath("/dashboard/messages", "layout")
        return { success: true, data: message, message: "Message sent" }
    } catch (err) {
        return { success: false, error: (err as Error).message || "Failed to send message" }
    }
}

export async function createConversationAction(raw: unknown): Promise<ActionResult> {
    const parsed = conversationSchema.safeParse(raw)
    if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

    const { createdBy } = raw as { createdBy: string }
    if (!createdBy) return { success: false, error: "Creator ID is required" }

    try {
        await connectDB()
        const { postConversation: create } = await import("@/services/messages/post-conversation")
        const conversation = await create({
            name: parsed.data.name,
            type: parsed.data.type,
            description: parsed.data.description,
            participantIds: parsed.data.participantIds,
            createdBy,
        })
        revalidatePath("/dashboard/messages", "layout")
        return { success: true, data: conversation, message: conversation.existing ? "Conversation already exists" : "Conversation created" }
    } catch (err) {
        return { success: false, error: (err as Error).message || "Failed to create conversation" }
    }
}

export async function deleteMessageAction(messageId: string): Promise<ActionResult> {
    await connectDB()
    const { MessageModel } = await import("@/models/message")
    const message = await MessageModel.findByIdAndUpdate(messageId, { isDeleted: true, content: "This message was deleted" }, { new: true })
    if (!message) return { success: false, error: "Message not found" }
    revalidatePath("/dashboard/messages", "layout")
    return { success: true, message: "Message deleted" }
}

export async function editMessageAction(messageId: string, content: string): Promise<ActionResult> {
    if (!content.trim()) return { success: false, error: "Message content cannot be empty" }
    await connectDB()
    const { MessageModel } = await import("@/models/message")
    const message = await MessageModel.findByIdAndUpdate(messageId, { content, isEdited: true }, { new: true })
    if (!message) return { success: false, error: "Message not found" }
    revalidatePath("/dashboard/messages", "layout")
    return { success: true, message: "Message edited" }
}

export async function archiveConversationAction(conversationId: string): Promise<ActionResult> {
    await connectDB()
    const { ConversationModel } = await import("@/models/conversation")
    const conversation = await ConversationModel.findByIdAndUpdate(conversationId, { isArchived: true }, { new: true })
    if (!conversation) return { success: false, error: "Conversation not found" }
    revalidatePath("/dashboard/messages", "layout")
    return { success: true, message: "Conversation archived" }
}

export async function addParticipantAction(conversationId: string, userId: string): Promise<ActionResult> {
    await connectDB()
    const { ConversationModel } = await import("@/models/conversation")
    const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        { $addToSet: { participants: { user: userId, role: "member" } } },
        { new: true }
    )
    if (!conversation) return { success: false, error: "Conversation not found" }
    revalidatePath("/dashboard/messages", "layout")
    return { success: true, message: "Participant added" }
}

export async function removeParticipantAction(conversationId: string, userId: string): Promise<ActionResult> {
    await connectDB()
    const { ConversationModel } = await import("@/models/conversation")
    const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        { $pull: { participants: { user: userId } } },
        { new: true }
    )
    if (!conversation) return { success: false, error: "Conversation not found" }
    revalidatePath("/dashboard/messages", "layout")
    return { success: true, message: "Participant removed" }
}
