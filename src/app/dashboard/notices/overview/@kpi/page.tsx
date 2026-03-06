import { NoticeKpi } from "@/features/dashboard/notices/overview/@kpi"
import * as notices from "@/services/notices"

export default async function KpiPage() {
    const [statusCounts, priorityBreakdown, audienceReach, expiring] = await Promise.all([
        notices.statusCounts(),
        notices.priorityBreakdown(),
        notices.audienceReach(),
        notices.getExpiringSoon(),
    ])
    const activeCount = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const urgentCount = priorityBreakdown.filter((p) => ["high", "urgent"].includes(p.priority)).reduce((s, p) => s + p.count, 0)

    return <NoticeKpi activeCount={activeCount} expiringCount={expiring.length} urgentCount={urgentCount} audienceCount={audienceReach.length} />
}
