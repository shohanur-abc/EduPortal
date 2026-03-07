import { connectDB } from '@/lib/db'
import { gradeDistribution } from './grade-distribution'
import { getRecent } from './get-recent'
import { avgBySubject } from './avg-by-subject'

export async function overview() {
    await connectDB()
    const [gradeDistributionData, recentResults, avgBySubjectData] = await Promise.all([
        gradeDistribution(),
        getRecent(),
        avgBySubject(),
    ])

    return { gradeDistribution: gradeDistributionData, recentResults, avgBySubject: avgBySubjectData }
}
