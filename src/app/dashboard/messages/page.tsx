import { redirect } from "next/navigation"
import ROUTES from "@/lib/routes"

export default function MessagesPage() {
    redirect(ROUTES.dashboard.messages.chat)
}
