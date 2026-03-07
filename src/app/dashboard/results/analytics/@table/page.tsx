import { AnalyticsTables } from "@/features/dashboard/results/analytics/@table"
import { Result } from "@/services"

export default async function AnalyticsTablePage() {
    const data = await Result.analytics()

    return <AnalyticsTables byExam={data.byExam} bySubject={data.bySubject} />
}
