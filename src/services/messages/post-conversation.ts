"use server"

import { revalidatePath } from "next/cache"
import { ConversationModel } from "@/models/conversation"
import { connectDB, sid } from "@/lib/db"
import { conversationSchema } from "@/schemas/dashboard"
import { success, error } from "@/lib/utils"
import { ActionResult } from "@/types/response"
import { ROUTES } from "@/lib/routes"


export async function postConversation(raw: unknown): Promise<ActionResult> {
    const parsed = conversationSchema.safeParse(raw)
    if (!parsed.success) return error(parsed.error.issues[0].message)

    const { createdBy } = raw as { createdBy: string }
    if (!createdBy) return error("Creator ID is required")

    try {
        const conversation = await post({
            name: parsed.data.name,
            type: parsed.data.type,
            description: parsed.data.description,
            participantIds: parsed.data.participantIds,
            createdBy,
        })
        revalidatePath(ROUTES.dashboard.messages.root, "layout")
        return success(conversation.existing ? "Conversation already exists" : "Conversation created", { data: conversation })
    } catch (err) {
        return error((err as Error).message || "Failed to create conversation")
    }
}



async function post(data: {
    name?: string
    type: "direct" | "group"
    description?: string
    avatar?: string | null
    participantIds: string[]
    createdBy: string
}) {
    await connectDB()

    // For direct conversations, check if one already exists
    if (data.type === "direct" && data.participantIds.length === 2) {
        const existing = await ConversationModel.findDirect(
            data.participantIds[0],
            data.participantIds[1]
        )
        if (existing) {
            return { _id: sid(existing), existing: true }
        }
    }

    const participants = data.participantIds.map((id) => ({
        user: id,
        role: id === data.createdBy ? "admin" : "member",
    }))

    // Ensure creator is in participants if not already
    if (!data.participantIds.includes(data.createdBy)) {
        participants.push({ user: data.createdBy, role: "admin" })
    }

    const conversation = await ConversationModel.create({
        name: data.name ?? "",
        type: data.type,
        description: data.description ?? "",
        avatar: data.avatar ?? null,
        participants,
        createdBy: data.createdBy,
    })

    return { _id: sid(conversation), existing: false }
}