import 'server-only'

import { connectDB } from '@/lib/db'
import { gradeDistribution } from './gradeDistribution'
import { getRecent } from './getRecent'
import { avgBySubject } from './avgBySubject'

export async function overview() {
    await connectDB()
    const [gradeDistributionData, recentResults, avgBySubjectData] = await Promise.all([
        gradeDistribution(),
        getRecent(),
        avgBySubject(),
    ])

    return { gradeDistribution: gradeDistributionData, recentResults, avgBySubject: avgBySubjectData }
}
