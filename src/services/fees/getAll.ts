import 'server-only'

import { FeeModel } from "@/models/fee"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getAll(limit: number = 200) {
    await connectDB()
    const fees = await FeeModel.getAll(limit)

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
