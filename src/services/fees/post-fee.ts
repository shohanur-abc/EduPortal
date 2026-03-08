"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { FeeModel } from "@/models/fee"
import { feeSchema } from "@/features/dashboard/validators"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function createFee(raw: unknown): Promise<ActionResult> {
    const parsed = feeSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const fee = await FeeModel.create({
        ...parsed.data,
        dueDate: new Date(parsed.data.dueDate),
    })

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee record created successfully", { data: { _id: String(fee._id) } })
}
