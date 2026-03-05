import { DataTable } from "@/components/molecules/data-table"
import { StatusBadge } from "@/components/molecules/status-badge"

export function NoticeExpiringTable({ data, loading }: { data: ExpiringNotice[]; loading?: boolean }) {
    return (
        <DataTable<ExpiringNotice>
            title="Expiring Soon"
            description="Notices expiring within 7 days"
            columns={[
                { key: "title", header: "Title" },
                { key: "authorName", header: "Author" },
                { key: "priority", header: "Priority", render: (r) => <StatusBadge status={r.priority as "low" | "medium" | "high" | "urgent"} /> },
                { key: "expiryDate", header: "Expiry Date" },
            ]}
            data={data}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}

interface ExpiringNotice {
    [key: string]: unknown
    _id: string
    title: string
    authorName: string
    priority: string
    expiryDate: string
}
