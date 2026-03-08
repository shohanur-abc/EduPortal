import { SummaryGrid } from "@/components/molecules/summary-grid"
import type { NoticeStatusCount, NoticeAudienceCount, NoticeExpiringItem } from "./types"

export function NoticeSummary({ counts, audienceReach, expiringSoon, loading }: NoticeSummaryProps & { loading?: boolean }) {
    const total = counts.reduce((a, c) => a + c.count, 0)
    const published = counts.find((c) => c.status === "published")?.count ?? 0
    const draft = counts.find((c) => c.status === "draft")?.count ?? 0
    const topAudience = audienceReach.length > 0 ? audienceReach[0].audience : "N/A"

    return (
        <SummaryGrid
            title="Notice Board Snapshot"
            description="Quick overview of current notice status"
            items={[
                { label: "Total Notices", value: total },
                { label: "Published", value: published },
                { label: "Drafts", value: draft },
                { label: "Expiring Soon", value: expiringSoon.length },
                { label: "Audience Segments", value: audienceReach.length },
                { label: "Top Audience", value: topAudience.charAt(0).toUpperCase() + topAudience.slice(1) },
            ]}
            columns={3}
            loading={loading}
        />
    )
}

interface NoticeSummaryProps {
    counts: NoticeStatusCount[]
    audienceReach: NoticeAudienceCount[]
    expiringSoon: NoticeExpiringItem[]
}
