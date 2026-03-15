import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import type { NoticeItem } from "./types"

export function NoticeTable({ notices, loading }: { notices: NoticeItem[]; loading?: boolean }) {
    return (
        <SimpleTable<NoticeItem>
            title="Recent Notices"
            description="Latest notice board entries"
            columns={[
                { key: "title", header: "Title", render: (n) => <span className="font-medium line-clamp-1">{n.title}</span> },
                { key: "authorName", header: "Author" },
                { key: "priority", header: "Priority", render: (n) => <StatusBadge status={n.priority as "low" | "medium" | "high" | "urgent"} /> },
                { key: "status", header: "Status", render: (n) => <StatusBadge status={n.status as "draft" | "published" | "archived"} /> },
                { key: "publishDate", header: "Published" },
            ]}
            data={notices}
            keyExtractor={(n) => n._id}
            loading={loading}
        />
    )
}
