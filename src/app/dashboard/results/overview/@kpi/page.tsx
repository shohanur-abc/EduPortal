import { ResultKpi } from "@/features/dashboard/results/overview/@kpi"
import { Result } from "@/services/result.service"

export default async function KpiPage() {
    const [examComparison, gradeDistribution, avgBySubject] = await Promise.all([
        Result.examComparison(),
        Result.gradeDistribution(),
        Result.avgBySubject(),
    ])
    const totalResults = gradeDistribution.reduce((s, g) => s + g.count, 0)
    const totalAvg = avgBySubject.length > 0 ? Math.round(avgBySubject.reduce((s, a) => s + a.avgMarks, 0) / avgBySubject.length) : 0
    const passGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
    const passCount = gradeDistribution.filter((g) => passGrades.includes(g.grade)).reduce((s, g) => s + g.count, 0)
    const passRate = totalResults > 0 ? Math.round((passCount / totalResults) * 100) : 0
    const totalStudents = examComparison.reduce((s, e) => s + e.studentCount, 0)

    return <ResultKpi avgMarks={totalAvg} passRate={passRate} totalExams={examComparison.length} totalStudents={totalStudents} />
}
