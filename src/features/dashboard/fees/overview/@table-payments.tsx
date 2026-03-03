import { DataTable } from "@/components/molecules/data-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"


export function RecentPaymentsTable({ recentPayments, loading }: { recentPayments: FeePayment[], loading?: boolean }) {
    return (
        <DataTable<FeePayment>
            title="Recent Payments"
            description="Latest fee payments received"
            columns={[
                { key: "studentName", header: "Student", render: (r) => <AvatarCell name={r.studentName} secondary={r.rollNumber} /> },
                { key: "type", header: "Type" },
                { key: "paidAmount", header: "Paid", render: (r) => <span>৳{r.paidAmount.toLocaleString()}</span> },
                { key: "paymentMethod", header: "Method" },
                { key: "receiptNumber", header: "Receipt" },
                { key: "paidDate", header: "Date" },
            ]}
            data={recentPayments}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}

// ========== TYPES ==========
interface FeePayment {
    [key: string]: unknown
    _id: string
    studentName: string
    rollNumber: string
    type: string
    amount: number
    paidAmount: number
    paidDate: string
    paymentMethod: string
    receiptNumber: string
}

