import { RecentPaymentsTable } from "@/features/dashboard/fees/overview/@table-payments"

export default function TableLoading() {
    return <RecentPaymentsTable recentPayments={recentPayments} loading />
}

const recentPayments = Array(10).fill(0).map((_, i) => ({
    _id: `${i}`,
    studentName: "Bappy Mahmud",
    rollNumber: "STU-2025-042",
    type: "development",
    amount: 4444,
    paidAmount: 55555,
    paidDate: "2026-02-26",
    paymentMethod: "bank_transfer",
    receiptNumber: "RCP-2025-0108",
}))