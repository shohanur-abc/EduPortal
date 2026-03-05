import { NoticePriorityChart } from "@/features/dashboard/notices/overview/@chart-priority"
export default function Loading() {
    return <NoticePriorityChart data={[{ priority: "low", count: 0 }, { priority: "medium", count: 0 }, { priority: "high", count: 0 }]} />
}
