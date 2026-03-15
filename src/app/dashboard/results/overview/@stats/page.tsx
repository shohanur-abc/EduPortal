import { ResultStatCards } from "@/features/dashboard/results/overview/@stats"
import { Result } from "@/services"

export default async function ResultStatsPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        Result.getGradeDistribution(),
        Result.getAvgBySubject(),
    ])

    const totalResults = gradeDistribution.reduce((s, g) => s + g.count, 0)
    const passGrades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
    const passCount = gradeDistribution.filter((g) => passGrades.includes(g.grade)).reduce((s, g) => s + g.count, 0)
    const passRate = totalResults > 0 ? Math.round((passCount / totalResults) * 100) : 0
    const highest = avgBySubject.length > 0 ? avgBySubject.reduce((a, b) => (a.avgMarks > b.avgMarks ? a : b)) : null

    return (
        <ResultStatCards
            totalResults={totalResults}
            passRate={passRate}
            subjectCount={avgBySubject.length}
            topSubject={highest?.subject ?? null}
            topSubjectAvg={highest?.avgMarks ?? null}
        />
    )
}
