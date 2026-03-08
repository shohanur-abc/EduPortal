import { ConversationModel } from "@/models/conversation"
import { connectDB, sid } from "@/lib/db"

export async function createConversation(data: {
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
