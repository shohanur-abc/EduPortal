import { FeeStatementsTable } from "@/features/dashboard/fees/statements/@table"

export default function TableLoading() {
    return <FeeStatementsTable records={records} loading />
}

const records = new Array(10).fill(0).map((_, i) => ({
    _id: `record-${i + 1}`,
    studentName: "Nazmul Mahmud",
    rollNumber: "STU-2025-017",
    type: "development",
    amount: 4444,
    paidAmount: 55555,
    status: 'Paid',
    dueDate: '2025-12-31',
    paidDate: '2025-12-15',
    academicYear: "2025-2026"
}))