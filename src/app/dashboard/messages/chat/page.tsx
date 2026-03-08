import type { Metadata } from "next"
import { auth } from "@/lib/auth"
import { ChatRoom } from "@/features/dashboard/messages/chat/chat-room"
import { Message, User } from "@/services"
import { redirect } from "next/navigation"
import ROUTES from "@/lib/routes"

export const metadata: Metadata = {
    title: "Chat | Messages",
    description: "Send and receive messages in real-time",
}

export default async function ChatPage() {
    const session = await auth()
    if (!session?.user?.id) redirect(ROUTES.auth.login)

    const userId = session.user.id

    const [conversations, allUsersRaw] = await Promise.all([
        Message.getConversations(userId),
        User.getAll(),
    ])

    // Map users to the ChatUser shape
    const allUsers = allUsersRaw.map((u) => ({
        _id: u._id,
        name: u.name,
        image: u.image ?? null,
        role: u.role,
        email: u.email,
    }))

    return (
        <ChatRoom
            currentUserId={userId}
            initialConversations={conversations}
            allUsers={allUsers}
        />
    )
}
