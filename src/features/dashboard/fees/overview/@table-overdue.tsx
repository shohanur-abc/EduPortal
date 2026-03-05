import { DataTable } from "@/components/molecules/data-table"
import { StatusBadge } from "@/components/molecules/status-badge"
import { AvatarCell } from "@/components/molecules/avatar-cell"


export function FeeOverdueTable({ overdueList, loading }: { overdueList: FeeOverdue[]; loading?: boolean }) {
    return (
        <DataTable<FeeOverdue>
            title="Overdue Fees"
            description="Students with overdue payments"
            columns={[
                { key: "studentName", header: "Student", render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} /> },
                { key: "type", header: "Type" },
                { key: "amount", header: "Amount", render: (r) => <span>৳{r.amount.toLocaleString()}</span> },
                { key: "dueDate", header: "Due Date" },
                { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status as "overdue" | "unpaid"} /> },
            ]}
            data={overdueList}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}

// ========== TYPES ==========
interface FeeOverdue {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    type: string
    amount: number
    paidAmount: number
    dueDate: string
    status: string
}