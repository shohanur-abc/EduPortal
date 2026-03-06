import { ReportComparison } from "@/features/dashboard/reports/overview/@comparison"
import * as reports from "@/services/reports"

export default async function ComparisonPage() {
    const [attendance, fees, results] = await Promise.all([
        reports.attendanceReport(),
        reports.feeReport(),
        reports.resultReport(),
    ])

    return (
        <ReportComparison
            attendanceCount={attendance.length}
            feeCount={fees.length}
            resultCount={results.length}
        />
    )
}
