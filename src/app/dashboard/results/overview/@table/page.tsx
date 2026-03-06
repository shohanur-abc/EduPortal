import { RecentResultsTable } from "@/features/dashboard/results/overview/@table"
import * as results from "@/services/results"

export default async function ResultTablePage() {
    const recentResults = await results.getRecent()
    return <RecentResultsTable recentResults={recentResults} />
}
