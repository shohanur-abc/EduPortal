import { AnalyticsStatCards } from "@/features/dashboard/results/analytics/@stats"

export default function StatsLoading() {
    return (
        <AnalyticsStatCards
            totalExams={80}
            overallAvg={80}
            overallPassRate={80}
            topSubjectName="Math"
            topSubjectAvg={80}
            loading={true}
        />
    )
}
