import { NoticeAnalyticsStatCards } from "@/features/dashboard/notices/analytics/@stats"
import * as notices from "@/services/notices"

export default async function NoticeAnalyticsStatsPage() {
    const [noticesData, statusCounts] = await Promise.all([notices.getAll(), notices.statusCounts()])

    const total = noticesData.length
    const published = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const publishRate = total > 0 ? Math.round((published / total) * 100) : 0
    const urgentCount = noticesData.filter((n) => n.priority === "urgent").length
    const highCount = noticesData.filter((n) => n.priority === "high").length
    const expiredPublished = noticesData.filter((n) => {
        if (!n.expiryDate) return false
        return new Date(n.expiryDate) < new Date() && n.status === "published"
    }).length

    return (
        <NoticeAnalyticsStatCards
            total={total}
            published={published}
            publishRate={publishRate}
            urgentHighCount={urgentCount + highCount}
            urgentCount={urgentCount}
            expiredPublished={expiredPublished}
        />
    )
}
