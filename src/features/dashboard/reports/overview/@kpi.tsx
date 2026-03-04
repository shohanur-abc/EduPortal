import { MetricCard } from "@/components/molecules/metric-card"
import { TrendingUp, Percent, FileBarChart, BarChart3 } from "lucide-react"

interface ReportKpiProps {
    avgAttendanceRate: number
    feeCollectionRate: number
    avgResultMarks: number
    totalDataPoints: number
}

export function ReportKpi({ avgAttendanceRate, feeCollectionRate, avgResultMarks, totalDataPoints, loading }: ReportKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Avg Attendance Rate"
                value={`${avgAttendanceRate}%`}
                subtitle="Across all records"
                icon={TrendingUp}
                variant={avgAttendanceRate >= 80 ? "success" : avgAttendanceRate >= 60 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Fee Collection Rate"
                value={`${feeCollectionRate}%`}
                subtitle="Collected vs total"
                icon={Percent}
                variant={feeCollectionRate >= 80 ? "success" : feeCollectionRate >= 60 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Avg Result Marks"
                value={`${avgResultMarks}%`}
                subtitle="Across all subjects"
                icon={BarChart3}
                variant={avgResultMarks >= 70 ? "success" : avgResultMarks >= 50 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Total Data Points"
                value={totalDataPoints}
                subtitle="All report entries"
                icon={FileBarChart}
                variant="default"
                loading={loading}
            />
        </>
    )
}
