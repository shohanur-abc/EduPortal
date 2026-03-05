import { AnalyticsStatCards } from "@/features/dashboard/results/analytics/@stats"
import { Result } from "@/services/result.service"

export default async function AnalyticsStatsPage() {
    const data = await Result.analytics()

    const totalExams = data.byExam.length
    const overallAvg = data.byExam.length > 0
        ? Math.round(data.byExam.reduce((s, e) => s + e.avgMarks, 0) / data.byExam.length)
        : 0
    const overallPassRate = data.byExam.length > 0
        ? Math.round(data.byExam.reduce((s, e) => s + e.passRate, 0) / data.byExam.length)
        : 0
    const topSubject = data.bySubject.length > 0
        ? data.bySubject.reduce((a, b) => (a.avgMarks > b.avgMarks ? a : b))
        : null

    return (
        <AnalyticsStatCards
            totalExams={totalExams}
            overallAvg={overallAvg}
            overallPassRate={overallPassRate}
            topSubjectName={topSubject?.subject ?? "N/A"}
            topSubjectAvg={topSubject?.avgMarks ?? null}
        />
    )
}
