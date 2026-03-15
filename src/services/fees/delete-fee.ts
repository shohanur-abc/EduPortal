"use server"

import { revalidatePath } from "next/cache"
import { ActionResult } from "@/types/response"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"

export async function deleteFee(id: string): Promise<ActionResult> {
    await db.connect()
    const fee = await db.fee.findByIdAndDelete(id)
    if (!fee) return error("Fee record not found")

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee record deleted")
}
