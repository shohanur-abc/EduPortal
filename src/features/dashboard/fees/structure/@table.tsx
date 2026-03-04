import { DataTable } from "@/components/molecules/data-table"
import { EmptyState } from "@/components/molecules/empty-state"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"


export function FeeStructureTable({ structure, loading }: { structure: FeeStructureItem[], loading?: boolean }) {
    if (structure.length === 0) {
        return (
            <EmptyState
                title="No Fee Structure"
                description="Fee structure has not been configured yet. Contact the administrator to set up fee types and amounts."
                icon={Settings}
            />
        )
    }

    return (
        <DataTable<FeeStructureItem>
            title="Fee Structure Breakdown"
            description={`${structure.length} fee types configured`}
            columns={[
                {
                    key: "type",
                    header: "Fee Type",
                    render: (r) => <span className="font-medium">{r.type}</span>
                },
                {
                    key: "totalAmount",
                    header: "Total Amount",
                    render: (r) => <span>৳{r.totalAmount.toLocaleString()}</span>
                },
                {
                    key: "avgAmount",
                    header: "Average Amount",
                    render: (r) => <span>৳{r.avgAmount.toLocaleString()}</span>
                },
                {
                    key: "count",
                    header: "Count",
                    render: (r) => <Badge variant="secondary">{r.count.toLocaleString()} records</Badge>
                },
            ]}
            data={structure}
            keyExtractor={(r) => r.type}
            loading={loading}
        />
    )
}


// ========== TYPES ==========
interface FeeStructureItem {
    [key: string]: unknown
    type: string
    totalAmount: number
    avgAmount: number
    count: number

}
