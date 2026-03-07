import { connectDB } from '@/lib/db'
import { attendanceReport } from './attendance-report'
import { feeReport } from './fee-report'
import { resultReport } from './result-report'

export async function getStandard(reportType: string) {
    await connectDB()
    switch (reportType) {
        case "attendance":
            return attendanceReport()
        case "fees":
            return feeReport()
        case "results":
            return resultReport()
        default:
            return []
    }
}
