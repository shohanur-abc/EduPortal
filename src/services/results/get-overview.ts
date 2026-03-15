"use server"

import { db } from '@/fatman'
import { getGradeDistribution } from './get-grade-distribution'
import { getRecent } from './get-recent'
import { getAvgBySubject } from './get-avg-by-subject'

export async function getOverview() {
    await db.connect()
    const [gradeDistributionData, recentResults, avgBySubjectData] = await Promise.all([
        getGradeDistribution(),
        getRecent(),
        getAvgBySubject(),
    ])

    return { gradeDistribution: gradeDistributionData, recentResults, avgBySubject: avgBySubjectData }
}
