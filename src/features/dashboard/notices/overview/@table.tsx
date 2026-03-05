import { DataTable } from "@/components/molecules/data-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/ui/badge"


export function RecentNoticesTable({ notices, loading = false }: { notices: NoticeRowFull[]; loading?: boolean }) {
    return (
        <DataTable<NoticeRowFull>
            title="Recent Notices"
            description="Latest announcements and communications"
            columns={[
                {
                    key: "title", header: "Title",
                    render: (r) => (
                        <div className="flex flex-col gap-0.5">
                            <span className="font-medium">{r.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1">
                                {r.content.length > 60 ? r.content.slice(0, 60).trimEnd() + "…" : r.content}
                            </span>
                        </div>
                    ),
                },
                { key: "authorName", header: "Author", render: (r) => <AvatarCell name={r.authorName} /> },
                {
                    key: "targetAudience", header: "Audience",
                    render: (r) => (
                        <div className="flex flex-wrap gap-1">
                            {r.targetAudience.map((a) => (
                                <Badge key={a} variant={audienceBadge(a)} className="text-xs">{a}</Badge>
                            ))}
                        </div>
                    ),
                },
                { key: "priority", header: "Priority", render: (r) => <StatusBadge status={r.priority as "low" | "medium" | "high" | "urgent"} /> },
                { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status as "draft" | "published" | "archived"} /> },
                {
                    key: "publishDate", header: "Published",
                    render: (r) => <span className="text-sm tabular-nums">{r.publishDate}</span>,
                },
            ]}
            data={notices}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}

function audienceBadge(audience: string) {
    switch (audience.toLowerCase()) {
        case "all": return "default" as const
        case "teachers": return "secondary" as const
        case "students": return "outline" as const
        case "parents": return "secondary" as const
        default: return "outline" as const
    }
}

// ============ Types ============
interface NoticeRow {
    [key: string]: unknown
    _id: string
    title: string
    authorName: string
    priority: string
    status: string
    publishDate: string
}


interface NoticeRowFull extends NoticeRow {
    content: string
    targetAudience: string[]
    expiryDate: string
}
