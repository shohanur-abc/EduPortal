import { NoticePriorityChart } from "@/features/dashboard/notices/overview/@chart-priority"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.priorityBreakdown()
    return <NoticePriorityChart data={data} />
}
