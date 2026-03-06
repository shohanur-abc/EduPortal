import { ResultOverviewCharts } from "@/features/dashboard/results/overview/@chart-grade"
import * as results from "@/services/results"

export default async function ResultChartPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        results.gradeDistribution(),
        results.avgBySubject(),
    ])

    return <ResultOverviewCharts gradeDistribution={gradeDistribution} />
}
