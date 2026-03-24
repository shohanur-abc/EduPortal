"use server"

import { revalidatePath } from "next/cache"
import { db, ROUTES } from "@/fatman"
import { error, success } from "@/fatman/utils"
import type { ActionResult } from "@/types/response"

interface UpdateBasicUserPayload {
    name: string
    email: string
    phone: string
    address: string
}

export async function updateBasicUser(id: string, payload: UpdateBasicUserPayload): Promise<ActionResult> {
    await db.connect()

    const updated = await db.user.findByIdAndUpdate(
        id,
        {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
        },
        { new: true }
    )

    if (!updated) return error("User not found")

    revalidatePath(ROUTES.dashboard.users.root, "layout")
    return success("User updated")
}
