import { StatCard } from "@/components/molecules/stat-card"
import { Bell, Send, FileText, Archive } from "lucide-react"


export function NoticeStatCards({ total, published, drafts, archived, loading = false }: NoticeStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Notices"
                value={total}
                icon={Bell}
                footer="All notices"
                loading={loading}
            />
            <StatCard
                title="Published"
                value={published}
                icon={Send}
                variant="success"
                footer="Currently visible"
                loading={loading}
            />
            <StatCard
                title="Drafts"
                value={drafts}
                icon={FileText}
                variant="warning"
                footer="Awaiting publish"
                loading={loading}
            />
            <StatCard
                title="Archived"
                value={archived}
                icon={Archive}
                variant="info"
                footer="Past notices"
                loading={loading}
            />
        </>
    )
}
// =========== Types ============
interface NoticeStats {
    total: number
    published: number
    drafts: number
    archived: number
}
