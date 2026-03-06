import 'server-only'

import { connectDB } from '@/lib/db'
import { attendanceReport } from './attendanceReport'
import { feeReport } from './feeReport'
import { resultReport } from './resultReport'

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
