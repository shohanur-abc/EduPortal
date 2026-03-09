"use server"

import { db } from "@/fatman"
import { fmtDate, pop } from '@/fatman/utils'

export async function getRecentPayments(limit: number = 10) {
    await db.connect()
    const payments = await db.fee.getRecentPayments(limit)

    return payments.map((f) => ({
        _id: String(f._id),
        studentName: pop(f.student, "name") || "Unknown",
        rollNumber: pop(f.student, "rollNumber"),
        type: f.type,
        amount: f.amount,
        paidAmount: f.paidAmount,
        paidDate: fmtDate(f.paidDate),
        paymentMethod: f.paymentMethod ?? "",
        receiptNumber: f.receiptNumber ?? "",
    }))
}
