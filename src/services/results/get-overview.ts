"use server"

import { connectDB } from '@/lib/db'
import { getGradeDistribution } from './get-grade-distribution'
import { getRecent } from './get-recent'
import { getAvgBySubject } from './get-avg-by-subject'

export async function getOverview() {
    await connectDB()
    const [gradeDistributionData, recentResults, avgBySubjectData] = await Promise.all([
        getGradeDistribution(),
        getRecent(),
        getAvgBySubject(),
    ])

    return { gradeDistribution: gradeDistributionData, recentResults, avgBySubject: avgBySubjectData }
}
