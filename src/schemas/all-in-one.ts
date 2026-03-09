import "server-only"

import { loginSchema } from "@/schemas/auth/login"
import { signupSchema } from "@/schemas/auth/signup"
import { resetPasswordSchema } from "@/schemas/auth/reset-password"
import { forgotPasswordSchema } from "@/schemas/auth/forgot-password"
import { verifyEmailSchema } from "@/schemas/auth/verify-email"
import { mfaVerifySchema } from "@/schemas/auth/mfa-verify"

import { noticeSchema } from "@/schemas/dashboard/notice"
import { studentSchema } from "@/schemas/dashboard/student"
import { teacherSchema } from "@/schemas/dashboard/teacher"
import { attendanceCorrectionSchema, attendanceEntrySchema, bulkAttendanceSchema } from "@/schemas/dashboard/attendance"
import { feeSchema, feePaymentSchema } from "@/schemas/dashboard/fee"
import { resultSchema } from "@/schemas/dashboard/result"
import { classSchema } from "@/schemas/dashboard/class"
import { userRoleSchema } from "@/schemas/dashboard/user-role"
import { messageSchema } from "@/schemas/dashboard/message"
import { conversationSchema } from "@/schemas/dashboard/conversation"


export const schemas = {
    login: loginSchema,
    signup: signupSchema,
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
    verifyEmail: verifyEmailSchema,
    mfaVerify: mfaVerifySchema,
    attendance: {
        correction: attendanceCorrectionSchema,
        bulk: bulkAttendanceSchema,
        entry: attendanceEntrySchema,
    },
    notice: noticeSchema,
    student: studentSchema,
    teacher: teacherSchema,
    fee: feeSchema,
    feePayment: feePaymentSchema,
    result: resultSchema,
    class: classSchema,
    userRole: userRoleSchema,
    message: messageSchema,
    conversation: conversationSchema,
}