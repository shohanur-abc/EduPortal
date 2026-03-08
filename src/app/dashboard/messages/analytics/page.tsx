import type { Metadata } from "next"
import { Message } from "@/services"
import { MessageTrendChart } from "@/features/dashboard/messages/analytics/@chart-trend"
import { DailyActivityChart } from "@/features/dashboard/messages/analytics/@chart-activity"
import { TopSendersTable } from "@/features/dashboard/messages/analytics/@top-senders"

export const metadata: Metadata = {
    title: "Analytics | Messages",
    description: "Message analytics and engagement insights",
}

export default async function MessagesAnalyticsPage() {
    const analytics = await Message.getAnalytics()

    return (
        <div className="space-y-6">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <MessageTrendChart data={analytics.messageTrend} />
                <DailyActivityChart data={analytics.dailyActivity} />
            </div>
            <TopSendersTable data={analytics.topSenders} />
        </div>
    )
}
