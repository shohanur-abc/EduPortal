"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { ResultModel } from "@/models/result"
import { resultSchema } from "@/features/dashboard/validators"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function createResult(raw: unknown): Promise<ActionResult> {
    const parsed = resultSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const result = await ResultModel.create(parsed.data)

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result entered successfully", { data: { _id: String(result._id) } })
}

export async function bulkCreateResults(entries: unknown[]): Promise<ActionResult> {
    const results = entries.map((e) => resultSchema.safeParse(e))
    const errors = results.filter((r) => !r.success)
    if (errors.length > 0) return error(`${errors.length} entries have validation errors`)

    await connectDB()
    const docs = results.map((r) => (r as { success: true; data: unknown }).data)
    await ResultModel.insertMany(docs)

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success(`${docs.length} results entered successfully`)
}
