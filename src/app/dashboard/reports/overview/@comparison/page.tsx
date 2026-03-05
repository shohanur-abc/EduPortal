import { ReportComparison } from "@/features/dashboard/reports/overview/@comparison"
import { Report } from "@/services/report.service"

export default async function ComparisonPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.attendanceReport(),
        Report.feeReport(),
        Report.resultReport(),
    ])

    return (
        <ReportComparison
            attendanceCount={attendance.length}
            feeCount={fees.length}
            resultCount={results.length}
        />
    )
}
