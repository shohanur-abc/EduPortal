"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import { ActionResult } from "@/types/response"

export async function deleteUser(id: string): Promise<ActionResult> {
    await db.connect()
    const user = await db.user.findByIdAndDelete(id)
    if (!user) return error("User not found")

    revalidatePath(ROUTES.dashboard.roles.root, "layout")
    revalidatePath(ROUTES.dashboard.users.root, "layout")
    return success("User deleted successfully")
}
