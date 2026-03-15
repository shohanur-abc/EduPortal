import { NoticeStatCards } from "@/features/dashboard/notices/overview/@stats"
import { Notice as notice } from "@/services"

export default async function StatsPage() {
    const counts = await notice.getStatusCounts()
    return <NoticeStatCards counts={counts} />
}
