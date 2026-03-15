import { StatCard } from "@/components/molecules/stat-card"
import { FileText, Send, Archive, FilePen } from "@/lib/icon"
import type { NoticeStatusCount } from "./types"

export function NoticeStatCards({ counts, loading }: { counts: NoticeStatusCount[]; loading?: boolean }) {
    const get = (s: string) => counts.find((c) => c.status === s)?.count ?? 0
    const total = counts.reduce((a, c) => a + c.count, 0)
    const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0)

    return (
        <>
            <StatCard
                title="Total Notices"
                value={total}
                icon={FileText}
                variant="info"
                footer={<>All notices in system</>}
                loading={loading}
            />
            <StatCard
                title="Published"
                value={get("published")}
                icon={Send}
                variant="success"
                footer={<><span data-loading={loading}>{pct(get("published"))}</span>% of total</>}
                loading={loading}
            />
            <StatCard
                title="Draft"
                value={get("draft")}
                icon={FilePen}
                variant="warning"
                footer={<><span data-loading={loading}>{pct(get("draft"))}</span>% of total</>}
                loading={loading}
            />
            <StatCard
                title="Archived"
                value={get("archived")}
                icon={Archive}
                variant="default"
                footer={<><span data-loading={loading}>{pct(get("archived"))}</span>% of total</>}
                loading={loading}
            />
        </>
    )
}
