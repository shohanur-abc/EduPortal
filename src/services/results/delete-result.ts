"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { ResultModel } from "@/models/result"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteResult(id: string): Promise<ActionResult> {
    await connectDB()
    const result = await ResultModel.findByIdAndDelete(id)
    if (!result) return error("Result not found")

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result deleted successfully")
}
