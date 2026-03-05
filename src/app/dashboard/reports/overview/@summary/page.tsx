import { ReportSummary } from "@/features/dashboard/reports/overview/@summary"
import { Report } from "@/services/report.service"

export default async function SummaryPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.attendanceReport(),
        Report.feeReport(),
        Report.resultReport(),
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
