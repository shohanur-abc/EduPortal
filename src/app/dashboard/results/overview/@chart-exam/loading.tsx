import { ResultExamComparisonChart } from "@/features/dashboard/results/overview/@chart-exam"
export default function Loading() {
    return <ResultExamComparisonChart data={Array(3).fill(0).map(() => ({ exam: "OOO", avgMarks: 0, passRate: 0, studentCount: 0 }))} />
}
