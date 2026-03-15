"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteClass(id: string): Promise<ActionResult> {
    await db.connect()
    const cls = await db.class.findByIdAndDelete(id)
    if (!cls) return error("Class not found")

    revalidatePath(ROUTES.dashboard.operations.root, "layout")
    return success("Class deleted successfully")
}
