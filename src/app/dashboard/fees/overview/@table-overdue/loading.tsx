import { FeeOverdueTable } from "@/features/dashboard/fees/overview/@table-overdue"

export default async function FeeOverdueTablePage() {

    return <FeeOverdueTable overdueList={data} loading />
}

const data = new Array(10).fill(0).map((_, i) => ({
    _id: `overdue-${i + 1}`,
    studentName: `Arif Hossain`,
    rollNumber: `2025-6A-003`,
    type: "development",
    amount: 4444,
    paidAmount: 55555,
    dueDate: "2025-05-14",
    status: "overdue",
}))