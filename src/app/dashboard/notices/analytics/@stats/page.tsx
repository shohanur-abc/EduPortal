import { NoticeAnalyticsStatCards } from "@/features/dashboard/notices/analytics/@stats"
import { Notice } from "@/services/notice.service"

export default async function NoticeAnalyticsStatsPage() {
    const [notices, statusCounts] = await Promise.all([Notice.getAll(), Notice.statusCounts()])

    const total = notices.length
    const published = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const publishRate = total > 0 ? Math.round((published / total) * 100) : 0
    const urgentCount = notices.filter((n) => n.priority === "urgent").length
    const highCount = notices.filter((n) => n.priority === "high").length
    const expiredPublished = notices.filter((n) => {
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
