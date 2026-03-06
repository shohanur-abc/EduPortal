import { ReportCardStatCards } from "@/features/dashboard/results/report-cards/@stats"
import * as resultsSvc from "@/services/results"

export default async function ReportCardStatsPage() {
    const results = await resultsSvc.getAll()

    const uniqueStudents = [...new Set(results.map((r) => r.rollNumber))].length
    const passGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
    const passCount = results.filter((r) => passGrades.includes(r.grade)).length
    const passRate = results.length > 0 ? Math.round((passCount / results.length) * 100) : 0
    const avgMarks = results.length > 0
        ? Math.round(results.reduce((s, r) => s + (r.totalMarks > 0 ? (r.marks / r.totalMarks) * 100 : 0), 0) / results.length)
        : 0

    return <ReportCardStatCards uniqueStudents={uniqueStudents} passRate={passRate} avgMarks={avgMarks} />
}
