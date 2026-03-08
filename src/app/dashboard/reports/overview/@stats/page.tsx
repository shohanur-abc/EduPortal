import { ReportStatCards } from "@/features/dashboard/reports/overview/@stats"
import { Report } from "@/services"

export default async function ReportStatsPage() {
    const [attendance, fees, results] = await Promise.all([
        Report.getReport(),
        Report.getFee(),
        Report.getResult(),
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
