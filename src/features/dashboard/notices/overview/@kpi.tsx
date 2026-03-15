import { MetricCard } from "@/components/molecules/metric-card"
import { BellRing, Eye, Users, AlertTriangle } from "@/lib/icon"
import type { NoticeStatusCount, NoticeAudienceCount, NoticeExpiringItem } from "./types"

export function NoticeKpi({ counts, audienceReach, expiringSoon, loading }: NoticeKpiProps & { loading?: boolean }) {
    const published = counts.find((c) => c.status === "published")?.count ?? 0
    const total = counts.reduce((a, c) => a + c.count, 0)
    const publishRate = total > 0 ? Math.round((published / total) * 100) : 0
    const totalReach = audienceReach.reduce((a, c) => a + c.count, 0)
    const expiringCount = expiringSoon.length

    return (
        <>
            <MetricCard
                title="Publish Rate"
                value={`${publishRate}%`}
                subtitle="Published vs total notices"
                icon={BellRing}
                variant={publishRate >= 50 ? "success" : "warning"}
                loading={loading}
            />
            <MetricCard
                title="Active Notices"
                value={published}
                subtitle="Currently visible to users"
                icon={Eye}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Audience Reach"
                value={totalReach}
                subtitle={`${audienceReach.length} audience segments`}
                icon={Users}
                variant="default"
                loading={loading}
            />
            <MetricCard
                title="Expiring Soon"
                value={expiringCount}
                subtitle="Within next 7 days"
                icon={AlertTriangle}
                variant={expiringCount > 0 ? "danger" : "success"}
                loading={loading}
            />
        </>
    )
}

interface NoticeKpiProps {
    counts: NoticeStatusCount[]
    audienceReach: NoticeAudienceCount[]
    expiringSoon: NoticeExpiringItem[]
}
