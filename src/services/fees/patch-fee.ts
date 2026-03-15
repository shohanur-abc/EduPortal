"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function recordFeePayment(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.feePayment.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const fee = await db.fee.findById(id)
    if (!fee) return error("Fee record not found")

    const newPaidAmount = fee.paidAmount + parsed.data.paidAmount
    const newStatus = newPaidAmount >= fee.amount ? "paid" : "partial"

    await db.fee.findByIdAndUpdate(id, {
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
    await db.connect()
    const fee = await db.fee.findByIdAndUpdate(id, { status: "waived" }, { new: true })
    if (!fee) return error("Fee record not found")

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee waived successfully")
}
