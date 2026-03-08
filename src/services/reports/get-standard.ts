"use server"

import { connectDB } from '@/lib/db'
import { getReport } from './get-report'
import { getFee } from './get-fee-report'
import { getResult } from './get-result-report'

export async function getStandard(reportType: string) {
    await connectDB()
    switch (reportType) {
        case "attendance":
            return getReport()
        case "fees":
            return getFee()
        case "results":
            return getResult()
        default:
            return []
    }
}
