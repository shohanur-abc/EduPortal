import { ReportStatCards } from "@/features/dashboard/reports/overview/@stats"
import * as reports from "@/services/reports"

export default async function ReportStatsPage() {
    const [attendance, fees, results] = await Promise.all([
        reports.attendanceReport(),
        reports.feeReport(),
        reports.resultReport(),
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
