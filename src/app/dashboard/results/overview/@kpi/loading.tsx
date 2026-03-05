import { ResultKpi } from "@/features/dashboard/results/overview/@kpi"

export default function Loading() {
    return <ResultKpi avgMarks={33} passRate={33} totalExams={3} totalStudents={555} loading={true} />
}
