import { SummaryGrid } from "@/components/molecules/summary-grid"
import { CalendarDays, DollarSign, GraduationCap, Settings } from "lucide-react"

export function ReportSummary({ attendanceCount, feeCount, resultCount, totalTemplates }: {
    attendanceCount: number
    feeCount: number
    resultCount: number
    totalTemplates: number
}) {
    return (
        <SummaryGrid
            title="Report Summary"
            description="Overview of available report data"
            items={[
                { label: "Attendance Records", value: String(attendanceCount), icon: CalendarDays },
                { label: "Fee Records", value: String(feeCount), icon: DollarSign },
                { label: "Result Records", value: String(resultCount), icon: GraduationCap },
                { label: "Templates Available", value: String(totalTemplates), icon: Settings },
            ]}
        />
    )
}
