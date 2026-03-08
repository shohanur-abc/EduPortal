import { DataTable } from "@/components/molecules/data-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/ui/badge"
import type { MessageAnalytics } from "./types"

type TopSender = MessageAnalytics["topSenders"][number]

export function TopSendersTable({ data, loading }: { data: TopSender[]; loading?: boolean }) {
    return (
        <DataTable<TopSender>
            title="Top Senders"
            description="Most active message senders"
            columns={[
                {
                    key: "name",
                    header: "User",
                    render: (s) => <AvatarCell name={s.name} image={s.image} secondary={s.role} />,
                },
                {
                    key: "role",
                    header: "Role",
                    render: (s) => <Badge variant="outline" className="capitalize text-xs">{s.role}</Badge>,
                },
                {
                    key: "count",
                    header: "Messages",
                    render: (s) => <span className="font-semibold tabular-nums">{s.count.toLocaleString()}</span>,
                },
            ]}
            data={data}
            keyExtractor={(s) => s._id}
            loading={loading}
        />
    )
}
