import { FeesCollectionSection } from "@/features/dashboard/fees/collection/@table"

export default async function FeesCollectionPage() {
    return <FeesCollectionSection records={records} students={students} loading={true} />
}



const records = new Array(10).fill(0).map((_, i) => ({
    _id: `record-${i + 1}`,
    studentName: `Bappy Mahmud`,
    rollNumber: `STU-2025-042`,
    type: "development",
    amount: 4444,
    paidAmount: 55555,
    dueDate: "2026-02-26",
    paidDate: "2026-02-26",
    status: "Overdue",
    paymentMethod: "bank_transfer",
    receiptNumber: `RCP-2025-0108`,
    academicYear: `2025-2026`

}))

const students = new Array(20).fill(0).map((_, i) => ({
    _id: `student-${i + 1}`,
    name: `Student ${i + 1}`,
    rollNumber: `R${String(i + 1).padStart(3, '0')}`,
}))