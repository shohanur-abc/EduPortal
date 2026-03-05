import { StatCard } from "@/components/molecules/stat-card"
import { Bell, Send, AlertTriangle, Clock } from "lucide-react"


export function NoticeAnalyticsStatCards({
    total,
    publishRate,
    urgentHighCount,
    urgentCount,
    expiredPublished,
    loading = false,
}: NoticeAnalyticsStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Notices"
                value={total}
                icon={Bell}
                footer="All time notices"
                loading={loading}

            />
            <StatCard
                title="Publish Rate"
                value={`${publishRate}%`}
                icon={Send}
                variant={publishRate >= 70 ? "success" : publishRate >= 40 ? "warning" : "danger"}
                trend={publishRate >= 70 ? "up" : "down"}
                trendValue={publishRate >= 70 ? "Good activity" : "Low activity"}
                loading={loading}
                footer="Percentage of drafts published"
            />
            <StatCard
                title="Urgent / High Priority"
                value={urgentHighCount}
                icon={AlertTriangle}
                variant={urgentHighCount > 0 ? "danger" : "default"}
                footer={urgentCount > 0 ? `${urgentCount} urgent` : "No urgent notices"}
                loading={loading}
            />
            <StatCard
                title="Expired (Still Published)"
                value={expiredPublished}
                icon={Clock}
                variant={expiredPublished > 0 ? "warning" : "success"}
                footer={expiredPublished > 0 ? "Need archiving" : "All up to date"}
                loading={loading}
            />
        </>
    )
}


interface NoticeAnalyticsStats {
    total: number
    published: number
    publishRate: number
    urgentHighCount: number
    urgentCount: number
    expiredPublished: number
}
