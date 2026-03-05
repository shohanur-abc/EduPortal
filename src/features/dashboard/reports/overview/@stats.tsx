import { StatCard } from "@/components/molecules/stat-card"
import { CalendarDays, DollarSign, GraduationCap, Settings } from "lucide-react"

interface ReportStatsProps {
    attendanceCount: number
    feeCount: number
    resultCount: number
    totalTemplates: number
}

export function ReportStatCards({ attendanceCount, feeCount, resultCount, totalTemplates, loading }: ReportStatsProps & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Attendance Records"
                value={attendanceCount}
                icon={CalendarDays}
                variant="success"
                footer="Report data rows"
                loading={loading}
            />
            <StatCard
                title="Fee Records"
                value={feeCount}
                icon={DollarSign}
                variant="info"
                footer="Fee status entries"
                loading={loading}
            />
            <StatCard
                title="Result Records"
                value={resultCount}
                icon={GraduationCap}
                variant="warning"
                footer="Exam subject entries"
                loading={loading}
            />
            <StatCard
                title="Total Templates"
                value={totalTemplates}
                icon={Settings}
                footer="Available report templates"
                loading={loading}
            />
        </>
    )
}
