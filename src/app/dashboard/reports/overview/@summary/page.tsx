import { ReportSummary } from "@/features/dashboard/reports/overview/@summary"
import * as reports from "@/services/reports"

export default async function SummaryPage() {
    const [attendance, fees, results] = await Promise.all([
        reports.attendanceReport(),
        reports.feeReport(),
        reports.resultReport(),
    ])

    return (
        <ReportSummary
            attendanceCount={attendance.length}
            feeCount={fees.length}
            resultCount={results.length}
            totalTemplates={18}
        />
    )
}
