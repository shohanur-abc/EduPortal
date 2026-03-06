import { ResultSummary } from "@/features/dashboard/results/overview/@summary"
import * as results from "@/services/results"

export default async function SummaryPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        results.gradeDistribution(),
        results.avgBySubject(),
    ])
    const totalResults = gradeDistribution.reduce((s, g) => s + g.count, 0)
    const avgMarks = avgBySubject.length > 0 ? Math.round(avgBySubject.reduce((s, a) => s + a.avgMarks, 0) / avgBySubject.length) : 0
    const passGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
    const passCount = gradeDistribution.filter((g) => passGrades.includes(g.grade)).reduce((s, g) => s + g.count, 0)
    const passRate = totalResults > 0 ? Math.round((passCount / totalResults) * 100) : 0
    const topSubject = avgBySubject.length > 0 ? avgBySubject.reduce((a, b) => (a.avgMarks > b.avgMarks ? a : b)).subject : "N/A"

    return <ResultSummary avgMarks={avgMarks} passRate={passRate} totalResults={totalResults} topSubject={topSubject} />
}
