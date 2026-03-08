"use server"

import { revalidatePath } from "next/cache"
import { connectDB } from "@/lib/db"
import { error, success } from "@/lib/utils"
import { UserModel } from "@/models/user"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"

export async function deleteUser(id: string): Promise<ActionResult> {
    await connectDB()
    const user = await UserModel.findByIdAndDelete(id)
    if (!user) return error("User not found")

    revalidatePath(ROUTES.dashboard.roles.root, "layout")
    revalidatePath(ROUTES.dashboard.users.root, "layout")
    return success("User deleted successfully")
}
