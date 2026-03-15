import { StatCard } from "@/components/molecules/stat-card"
import { BarChart3, CheckCircle, Clock, Percent, XCircle } from "lucide-react"

export function AttendanceReportStatCards({ total, presentCount, absentCount, lateCount, attendanceRate, loading }: AttendanceReportStats) {
    const pct = (count: number) => Math.round((count / total) * 100) || 0
    return (
        <>
            <StatCard
                title="Total Records"
                value={total}
                icon={BarChart3}
                footer="All attendance entries"
                loading={loading}
            />
            <StatCard2
                title="Present"
                value={presentCount}
                icon={CheckCircle}
                variant="success"
                footer={pct(presentCount)}
                loading={loading}
            />
            <StatCard2
                title="Absent"
                value={absentCount}
                icon={XCircle}
                variant="danger"
                footer={pct(absentCount)}
                loading={loading}
            />
            <StatCard2
                title="Late"
                value={lateCount}
                icon={Clock}
                variant="warning"
                footer={pct(lateCount)}
                loading={loading}
            />
            <StatCard
                title="Attendance Rate"
                value={`${attendanceRate}%`}
                icon={Percent}
                variant={attendanceRate >= 80 ? "success" : attendanceRate >= 60 ? "warning" : "danger"}
                footer="Present / Total"
                loading={loading}
            />
        </>
    )
}
const StatCard2 = (props: React.ComponentProps<typeof StatCard>) => (
    <StatCard  {...props} footer={<><span data-loading={props.loading}>{props.footer}%</span> of total </>} />
)