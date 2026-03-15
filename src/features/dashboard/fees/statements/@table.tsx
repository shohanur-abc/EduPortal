import { SimpleTable } from "@/components/molecules/simple-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { EmptyState } from "@/components/molecules/empty-state"
import { Receipt } from "@/lib/icon"

export function FeeStatementsTable({ records, loading }: { records: FeeRecord[], loading?: boolean }) {
    if (records.length === 0) {
        return (
            <EmptyState
                title="No Fee Statements"
                description="There are no fee records available to generate statements. Statements will appear once fees are assigned and payments recorded."
                icon={Receipt}
            />
        )
    }

    return (
        <SimpleTable<FeeRecord>
            title="Student Fee Details"
            description={`Fee statements for ${records.length} records`}
            columns={[
                {
                    key: "studentName",
                    header: "Student",
                    render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} />,
                },
                { key: "type", header: "Fee Type" },
                { key: "academicYear", header: "Academic Year" },
                {
                    key: "amount",
                    header: "Amount",
                    render: (r) => <span>৳{r.amount.toLocaleString()}</span>,
                },
                {
                    key: "paidAmount",
                    header: "Paid",
                    render: (r) => (
                        <span className={r.paidAmount >= r.amount ? "font-medium text-green-700 dark:text-green-400" : "text-muted-foreground"}>
                            ৳{r.paidAmount.toLocaleString()}
                        </span>
                    ),
                },
                {
                    key: "balance",
                    header: "Balance",
                    render: (r) => {
                        const balance = r.amount - r.paidAmount
                        return (
                            <span className={balance > 0 ? "font-medium text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"}>
                                ৳{balance.toLocaleString()}
                            </span>
                        )
                    },
                },
                {
                    key: "status",
                    header: "Status",
                    render: (r) => <StatusBadge status={r.status as "paid" | "unpaid" | "partial" | "overdue" | "waived"} />,
                },
                { key: "dueDate", header: "Due Date" },
                {
                    key: "paidDate",
                    header: "Paid Date",
                    render: (r) => <span>{r.paidDate || "—"}</span>,
                },
            ]}
            data={records}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}


// ========== TYPES ==========
interface FeeRecord {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    type: string
    amount: number
    paidAmount: number
    status: string
    dueDate: string
    paidDate: string
    academicYear: string
}
