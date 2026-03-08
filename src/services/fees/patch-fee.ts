"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { FeeModel } from "@/models/fee"
import { feePaymentSchema } from "@/features/dashboard/validators"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function recordFeePayment(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = feePaymentSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const fee = await FeeModel.findById(id)
    if (!fee) return error("Fee record not found")

    const newPaidAmount = fee.paidAmount + parsed.data.paidAmount
    const newStatus = newPaidAmount >= fee.amount ? "paid" : "partial"

    await FeeModel.findByIdAndUpdate(id, {
        paidAmount: newPaidAmount,
        paidDate: parsed.data.paidDate ? new Date(parsed.data.paidDate) : new Date(),
        paymentMethod: parsed.data.paymentMethod,
        receiptNumber: parsed.data.receiptNumber || undefined,
        status: newStatus,
    })

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success(`Payment of ৳${parsed.data.paidAmount} recorded — status: ${newStatus}`)
}

export async function waiveFee(id: string): Promise<ActionResult> {
    await connectDB()
    const fee = await FeeModel.findByIdAndUpdate(id, { status: "waived" }, { new: true })
    if (!fee) return error("Fee record not found")

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee waived successfully")
}
