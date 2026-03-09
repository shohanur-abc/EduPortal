"use server"

import { db } from "@/fatman"
import { fmtDate, pop } from '@/fatman/utils'

export async function getOverdue(limit: number = 10) {
    await db.connect()
    const overdue = await db.fee.getOverdue(limit)

    return overdue.map((f) => ({
        _id: String(f._id),
        studentName: pop(f.student, "name") || "Unknown",
        rollNumber: pop(f.student, "rollNumber"),
        type: f.type,
        amount: f.amount,
        paidAmount: f.paidAmount,
        dueDate: fmtDate(f.dueDate),
        status: f.status,
    }))
}
