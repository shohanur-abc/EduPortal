"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { UserModel } from "@/models/user"
import { userRoleSchema } from "@/schemas/dashboard"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function updateUserRole(id: string, raw: unknown): Promise<ActionResult> {
    const parsed = userRoleSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    await connectDB()
    const user = await UserModel.findByIdAndUpdate(id, { role: parsed.data.role }, { new: true })
    if (!user) return error("User not found")

    revalidatePath(ROUTES.dashboard.roles.root, "layout")
    revalidatePath(ROUTES.dashboard.users.root, "layout")
    return success(`User role updated to ${parsed.data.role}`)
}
