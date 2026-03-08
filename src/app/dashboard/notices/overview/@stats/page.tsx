import { NoticeStatCards } from "@/features/dashboard/notices/overview/@stats"
import { Notice as notice } from "@/services"

export default async function StatsPage() {
    const counts = await notice.statusCounts()
    return <NoticeStatCards counts={counts} />
}
