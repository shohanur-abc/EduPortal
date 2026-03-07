import { FeeModel } from "@/models/fee"
import { fmtDate } from '@/lib/utils'
import { connectDB, pop } from '@/lib/db'

export async function getRecentPayments(limit: number = 10) {
    await connectDB()
    const payments = await FeeModel.getRecentPayments(limit)

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
