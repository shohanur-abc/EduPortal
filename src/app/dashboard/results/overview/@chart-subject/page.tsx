import { SubjectAverageChart } from "@/features/dashboard/results/overview/@chart-subject"
import * as results from "@/services/results"

export default async function ResultChartPage() {
    const [gradeDistribution, avgBySubject] = await Promise.all([
        results.gradeDistribution(),
        results.avgBySubject(),
    ])

    return <SubjectAverageChart avgBySubject={avgBySubject} />
}
