import { SubjectAverageChart } from "@/features/dashboard/results/overview/@chart-subject"
import { Result } from "@/services"

export default async function ResultChartPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        Result.getGradeDistribution(),
        Result.getAvgBySubject(),
    ])

    return <SubjectAverageChart avgBySubject={avgBySubject} />
}
