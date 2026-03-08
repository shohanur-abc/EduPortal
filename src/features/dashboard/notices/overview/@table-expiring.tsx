import { MiniTable } from "@/components/molecules/mini-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import type { NoticeExpiringItem } from "./types"

export function NoticeExpiringTable({ notices, loading }: { notices: NoticeExpiringItem[]; loading?: boolean }) {
    return (
        <MiniTable
            title="Expiring Soon"
            description="Notices expiring within 7 days"
            headers={["Title", "Author", "Priority", "Expires"]}
            rows={notices.map((n) => ({
                id: n._id,
                cells: [
                    <span key="title" className="font-medium line-clamp-1">{n.title}</span>,
                    n.authorName,
                    <StatusBadge key="p" status={n.priority as "low" | "medium" | "high" | "urgent"} />,
                    n.expiryDate,
                ],
            }))}
            loading={loading}
        />
    )
}
