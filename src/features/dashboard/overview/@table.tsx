import { DataTable } from "@/components/molecules/data-table";
import { NoticeRow } from "./types";
import { AvatarCell } from "@/components/molecules/avatar-cell";
import { StatusBadge } from "@/components/molecules/status-badge";


// ============= RECENT ACTIVITY (reusable as generic notice list) =============
export function RecentNotices({ notices, loading = false }: { notices: NoticeRow[]; loading?: boolean }) {
    return (
        <DataTable
            title="Recent Notices"
            description="Latest announcements and updates"
            columns={[
                {
                    key: "title",
                    header: "Title",
                    render: (row) => <span className="font-medium">{row.title}</span>,
                },
                {
                    key: "authorName",
                    header: "Author",
                    render: (row) => <AvatarCell name={row.authorName} />,
                },
                {
                    key: "priority",
                    header: "Priority",
                    render: (row) => <StatusBadge status={row.priority as "low" | "medium" | "high" | "urgent"} />,
                },
                {
                    key: "status",
                    header: "Status",
                    render: (row) => <StatusBadge status={row.status as "draft" | "published" | "archived"} />,
                },
                { key: "publishDate", header: "Date" },
            ]}
            data={notices}
            keyExtractor={(row) => row._id}
            loading={loading}
        />
    )
}
