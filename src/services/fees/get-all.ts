"use server"

import { db } from "@/fatman"
import { fmtDate, pop } from '@/fatman/utils'

export async function getAll(limit: number = 200) {
    await db.connect()
    const fees = await db.fee.getAll(limit)

    return fees.map((f) => ({
        _id: String(f._id),
        studentName: pop(f.student, "name") || "Unknown",
        rollNumber: pop(f.student, "rollNumber"),
        type: f.type,
        amount: f.amount,
        paidAmount: f.paidAmount,
        dueDate: fmtDate(f.dueDate),
        paidDate: fmtDate(f.paidDate),
        status: f.status,
        paymentMethod: f.paymentMethod ?? "",
        receiptNumber: f.receiptNumber ?? "",
        academicYear: f.academicYear,
    }))
}
