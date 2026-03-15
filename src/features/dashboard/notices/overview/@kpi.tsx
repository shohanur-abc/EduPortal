import { MetricCard } from "@/components/molecules/metric-card"
import { Megaphone, Clock, AlertTriangle, Users } from "lucide-react"

export function NoticeKpi({ activeCount, expiringCount, urgentCount, audienceCount, loading }: NoticeKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Active Notices"
                value={activeCount}
                subtitle="Currently published"
                icon={Megaphone}
                variant="success"
                loading={loading}
            />
            <MetricCard
                title="Expiring Soon"
                value={expiringCount}
                subtitle="Within 7 days"
                icon={Clock}
                variant="warning"
                loading={loading}
            />
            <MetricCard
                title="Urgent Notices"
                value={urgentCount}
                subtitle="High/Urgent priority"
                icon={AlertTriangle}
                variant="danger"
                loading={loading}
            />
            <MetricCard
                title="Audience Reach"
                value={audienceCount}
                subtitle="Target groups"
                icon={Users}
                variant="info"
                loading={loading}
            />
        </>
    )
}

interface NoticeKpiProps {
    activeCount: number
    expiringCount: number
    urgentCount: number
    audienceCount: number
}
