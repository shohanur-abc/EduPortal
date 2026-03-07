import { ResultOverviewCharts } from "@/features/dashboard/results/overview/@chart-grade"
import { Result } from "@/services"

export default async function ResultChartPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        Result.gradeDistribution(),
        Result.avgBySubject(),
    ])

    return <ResultOverviewCharts gradeDistribution={gradeDistribution} />
}
