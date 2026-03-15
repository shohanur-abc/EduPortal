"use server"

import { db } from '@/fatman'
import { getReport } from './get-report'
import { getFee } from './get-fee-report'
import { getResult } from './get-result-report'

export async function getStandard(reportType: string) {
    await db.connect()
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
