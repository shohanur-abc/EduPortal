"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES, schemas } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function updateUserRole(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = schemas.userRole.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await db.connect()
    const user = await db.user.findByIdAndUpdate(id, { role: parsed.data.role }, { new: true })
    if (!user) return error("User not found")

    revalidatePath(ROUTES.dashboard.roles.root, "layout")
    revalidatePath(ROUTES.dashboard.users.root, "layout")
    return success(`User role updated to ${parsed.data.role}`)
}
