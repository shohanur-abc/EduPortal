import { ResultTopPerformersTable } from "@/features/dashboard/results/overview/@table-performers"
export default function Loading() {
    return <ResultTopPerformersTable data={Array(5).fill(0).map(() => ({ studentName: "OOOOOO", rollNumber: "OOO-OOO", className: "OOOOOO", avgMarks: 33, totalExams: 3 }))} loading={true} />
}
