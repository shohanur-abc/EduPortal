import { StatCard } from "@/components/molecules/stat-card"
import { Award, BarChart3, TrendingUp } from "@/lib/icon"

export function ReportCardStatCards({ uniqueStudents, passRate, avgMarks, loading }: ReportCardStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Students"
                value={uniqueStudents}
                icon={Award}
                footer="Students with results"
                loading={loading}
            />
            <StatCard
                title="Pass Rate"
                value={`${passRate}%`}
                icon={TrendingUp}
                variant={passRate >= 80 ? "success" : passRate >= 60 ? "warning" : "danger"}
                trend={passRate >= 80 ? "up" : "down"}
                trendValue={passRate >= 80 ? "Good standing" : "Below target"}
                footer="Based on all results"
                loading={loading}
            />
            <StatCard
                title="Average Marks"
                value={`${avgMarks}%`}
                icon={BarChart3}
                variant={avgMarks >= 70 ? "success" : avgMarks >= 50 ? "warning" : "danger"}
                footer="Across all subjects"
                loading={loading}
            />
        </>
    )
}
