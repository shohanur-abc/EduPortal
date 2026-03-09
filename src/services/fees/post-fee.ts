"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function createFee(raw: unknown): Promise<ActionResult> {
    const parsed = schemas.fee.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const fee = await db.fee.create({
        ...parsed.data,
        dueDate: new Date(parsed.data.dueDate),
    })

    revalidatePath(ROUTES.dashboard.fees.root, "layout")
    return success("Fee record created successfully", { data: { _id: String(fee._id) } })
}
