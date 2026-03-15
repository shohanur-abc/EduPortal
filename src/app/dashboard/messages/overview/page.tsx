import type { Metadata } from "next"
import { Message } from "@/services"
import { MessageKpi } from "@/features/dashboard/messages/overview/@kpi"

export const metadata: Metadata = {
    title: "Overview | Messages",
    description: "Message module overview with key metrics",
}

export default async function MessagesOverviewPage() {
    const data = await Message.getOverview()

    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <MessageKpi data={data} />
            </div>
        </div>
    )
}
