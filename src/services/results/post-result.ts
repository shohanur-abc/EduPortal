"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function createResult(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.result.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const result = await db.result.create(parsed.data)

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success("Result entered successfully", { data: { _id: String(result._id) } })
}

export async function bulkCreateResults(entries: unknown[]): Promise<ActionResult> {
    const results = entries.map((e) => schemas.result.safeParse(e))
    const errors = results.filter((r) => !r.success)
    if (errors.length > 0) return error(`${errors.length} entries have validation errors`)

    await db.connect()
    const docs = results.map((r) => (r as { success: true; data: unknown }).data)
    await db.result.insertMany(docs)

    revalidatePath(ROUTES.dashboard.results.root, "layout")
    return success(`${docs.length} results entered successfully`)
}
