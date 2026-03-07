import { NoticePriorityChart } from "@/features/dashboard/notices/overview/@chart-priority"
import { Notice } from "@/services"
export default async function Page() {
    const data = await Notice.priorityBreakdown()
    return <NoticePriorityChart data={data} />
}
