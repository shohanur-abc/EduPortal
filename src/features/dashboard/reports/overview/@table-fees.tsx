import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { Badge } from "@/components/ui/badge"

interface FeeReportRow {
    [key: string]: unknown
    status: string
    total: number
    collected: number
    count: number
}

export function FeeReportTable({ data, loading }: { data: FeeReportRow[]; loading?: boolean }) {
    return (
        <SimpleTable<FeeReportRow>
            title="Fee Collection Data"
            description="Fee status and collection amounts"
            columns={[
                {
                    key: "status",
                    header: "Status",
                    render: (r) => <StatusBadge status={r.status as "paid" | "unpaid" | "partial" | "overdue"} />,
                },
                {
                    key: "total",
                    header: "Total Amount",
                    render: (r) => <span className="font-medium">৳{r.total.toLocaleString()}</span>,
                },
                {
                    key: "collected",
                    header: "Collected",
                    render: (r) => <span className="text-green-700 dark:text-green-400">৳{r.collected.toLocaleString()}</span>,
                },
                {
                    key: "count",
                    header: "Students",
                    render: (r) => <Badge variant="outline">{r.count}</Badge>,
                },
            ]}
            data={data}
            keyExtractor={(r) => r.status}
            loading={loading}
        />
    )
}
