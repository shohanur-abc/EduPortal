import { AnalyticsTables } from "@/features/dashboard/results/analytics/@table"
import * as results from "@/services/results"

export default async function AnalyticsTablePage() {
    const data = await results.analytics()

    return <AnalyticsTables byExam={data.byExam} bySubject={data.bySubject} />
}
