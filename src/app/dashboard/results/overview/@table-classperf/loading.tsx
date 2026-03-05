import { ResultClassPerformanceTable } from "@/features/dashboard/results/overview/@table-classperf"
export default function Loading() {
    return <ResultClassPerformanceTable data={Array(5).fill(0).map(() => ({ className: "OOOOOO", avgMarks: 33, maxMarks: 333, minMarks: 33, studentCount: 33, passRate: 33 }))} loading={true} />
}
