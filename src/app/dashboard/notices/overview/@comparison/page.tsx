import { NoticePriorityComparison } from "@/features/dashboard/notices/overview/@comparison"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.priorityBreakdown()
    return <NoticePriorityComparison data={data.map((d) => ({
        label: d.priority.charAt(0).toUpperCase() + d.priority.slice(1),
        value: d.count,
        color: d.priority === "urgent" ? "var(--chart-5)" : d.priority === "high" ? "var(--chart-4)" : d.priority === "medium" ? "var(--chart-3)" : "var(--chart-1)",
    }))} />
}
