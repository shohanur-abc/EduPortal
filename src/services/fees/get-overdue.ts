"use server"

import { FeeModel } from "@/models/fee"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getOverdue(limit: number = 10) {
    await connectDB()
    const overdue = await FeeModel.getOverdue(limit)

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
