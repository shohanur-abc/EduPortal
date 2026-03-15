"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteResult(id: string): Promise<ActionResult> {
    await db.connect()
    const result = await db.result.findByIdAndDelete(id)
    if (!result) return error("Result not found")

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result deleted successfully")
}
