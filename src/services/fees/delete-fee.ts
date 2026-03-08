"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { FeeModel } from "@/models/fee"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteFee(id: string): Promise<ActionResult> {
    await connectDB()
    const fee = await FeeModel.findByIdAndDelete(id)
    if (!fee) return error("Fee record not found")

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee record deleted")
}
