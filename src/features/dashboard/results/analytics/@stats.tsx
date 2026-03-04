import { StatCard } from "@/components/molecules/stat-card"
import { Award, BarChart3, FileText, TrendingUp } from "lucide-react"


export function AnalyticsStatCards({ totalExams, overallAvg, overallPassRate, topSubjectName, topSubjectAvg, loading }: AnalyticsStats) {
    return (
        <>
            <StatCard
                title="Exams Analyzed"
                value={totalExams}
                icon={FileText}
                footer="Total exam types"
                loading={loading}
            />
            <StatCard
                title="Overall Average"
                value={`${overallAvg}%`}
                icon={BarChart3}
                variant={overallAvg >= 70 ? "success" : overallAvg >= 50 ? "warning" : "danger"}
                footer="Across all exams"
                loading={loading}
            />
            <StatCard
                title="Overall Pass Rate"
                value={`${overallPassRate}%`}
                icon={TrendingUp}
                variant={overallPassRate >= 80 ? "success" : overallPassRate >= 60 ? "warning" : "danger"}
                trend={overallPassRate >= 80 ? "up" : "down"}
                trendValue={overallPassRate >= 80 ? "On track" : "Below target"}
                footer="Average across exams"
                loading={loading}
            />
            <StatCard
                title="Top Subject"
                value={topSubjectName}
                icon={Award}
                variant="success"
                footer={topSubjectAvg != null ? `Avg: ${topSubjectAvg}%` : undefined}
                loading={loading}
            />
        </>
    )
}
