import { ResultSubjectProgress } from "@/features/dashboard/results/overview/@progress-subjects"
export default function Loading() {
    return <ResultSubjectProgress data={Array(5).fill(0).map(() => ({ subject: "OOOOOO", avgMarks: 33, maxMarks: 333, minMarks: 33, passRate: 33, failCount: 3, total: 33 }))} loading={true} />
}
