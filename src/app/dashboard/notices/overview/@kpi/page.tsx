import { NoticeKpi } from "@/features/dashboard/notices/overview/@kpi"
import { Notice } from "@/services/notice.service"

export default async function KpiPage() {
    const [statusCounts, priorityBreakdown, audienceReach, expiring] = await Promise.all([
        Notice.statusCounts(),
        Notice.priorityBreakdown(),
        Notice.audienceReach(),
        Notice.getExpiringSoon(),
    ])
    const activeCount = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const urgentCount = priorityBreakdown.filter((p) => ["high", "urgent"].includes(p.priority)).reduce((s, p) => s + p.count, 0)

    return <NoticeKpi activeCount={activeCount} expiringCount={expiring.length} urgentCount={urgentCount} audienceCount={audienceReach.length} />
}
