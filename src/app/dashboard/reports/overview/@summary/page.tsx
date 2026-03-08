import { ReportSummary } from "@/features/dashboard/reports/overview/@summary"
import { Report } from "@/services"

export default async function SummaryPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.getReport(),
        Report.getFee(),
        Report.getResult(),
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
