import { MetricCard } from "@/components/molecules/metric-card"
import { Target, TrendingUp, Clock, CalendarCheck } from "lucide-react"

export function AttendanceKpi({ rate, todayPresent, todayTotal, avgLate, loading }: AttendanceKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Overall Attendance Rate"
                value={`${rate}%`}
                subtitle="All-time attendance rate"
                icon={Target}
                variant={rate >= 85 ? "success" : rate >= 70 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Today's Attendance"
                value={`${todayPresent}/${todayTotal}`}
                subtitle={todayTotal > 0 ? `${Math.round((todayPresent / todayTotal) * 100)}% present today` : "No records yet"}
                icon={CalendarCheck}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Avg Late Arrivals"
                value={avgLate}
                subtitle="Per day average"
                icon={Clock}
                variant="warning"
                loading={loading}
            />
            <MetricCard
                title="Trend"
                value={rate >= 85 ? "Improving" : "Needs Attention"}
                subtitle="Based on monthly comparison"
                icon={TrendingUp}
                variant={rate >= 85 ? "success" : "warning"}
                loading={loading}
            />
        </>
    )
}

interface AttendanceKpiProps {
    rate: number
    todayPresent: number
    todayTotal: number
    avgLate: number
}
