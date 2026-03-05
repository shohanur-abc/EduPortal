import { ReportStatCards } from "@/features/dashboard/reports/overview/@stats"
import { Report } from "@/services/report.service"

export default async function ReportStatsPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.attendanceReport(),
        Report.feeReport(),
        Report.resultReport(),
    ])

    return (
        <ReportStatCards
            attendanceCount={attendance.length}
            feeCount={fees.length}
            resultCount={results.length}
            totalTemplates={18}
        />
    )
}
