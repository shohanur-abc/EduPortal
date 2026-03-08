import { NoticePriorityChart } from "@/features/dashboard/notices/overview/@chart-priority"
import { Notice as notice } from "@/services"

export default async function ChartPriorityPage() {
    const data = await notice.getPriorityBreakdown()
    return <NoticePriorityChart data={data} />
}
