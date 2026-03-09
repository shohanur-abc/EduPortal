"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { ResultModel } from "@/models/result"
import { resultSchema } from "@/schemas/dashboard"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function updateResult(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = resultSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    // Use save() to trigger pre-save middleware (grade calculation)
    const result = await ResultModel.findById(id)
    if (!result) return error("Result not found")

    Object.assign(result, parsed.data)
    await result.save()

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result updated successfully")
}
