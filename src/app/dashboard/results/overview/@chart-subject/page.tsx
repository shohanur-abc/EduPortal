import { SubjectAverageChart } from "@/features/dashboard/results/overview/@chart-subject"
import { Result } from "@/services/result.service"

export default async function ResultChartPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        Result.gradeDistribution(),
        Result.avgBySubject(),
    ])

    return <SubjectAverageChart avgBySubject={avgBySubject} />
}
