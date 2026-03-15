import { FeeStatusBarChart } from "@/features/dashboard/fees/overview/@chart"
import { Fee } from "@/services"

export default async function FeeChartPage() {
    const [statusBreakdown, overdueList] = await Promise.all([
        Fee.statusBreakdown(),
        Fee.getOverdue(),
    ])
    return <FeeStatusBarChart data={statusBreakdown.sort((a, b) => a.count - b.count)} />
}
