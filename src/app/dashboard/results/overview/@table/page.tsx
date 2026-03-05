import { RecentResultsTable } from "@/features/dashboard/results/overview/@table"
import { Result } from "@/services/result.service"

export default async function ResultTablePage() {
    const recentResults = await Result.getRecent()
    return <RecentResultsTable recentResults={recentResults} />
}
