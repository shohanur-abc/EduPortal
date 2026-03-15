import { ReportComparison } from "@/features/dashboard/reports/overview/@comparison"
import { Report } from "@/services"

export default async function ComparisonPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.getReport(),
        Report.getFee(),
        Report.getResult(),
    ])

    return (
        <ReportComparison
            attendanceCount={attendance.length}
            feeCount={fees.length}
            resultCount={results.length}
        />
    )
}
