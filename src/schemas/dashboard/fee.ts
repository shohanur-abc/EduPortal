import { z } from "zod"

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
