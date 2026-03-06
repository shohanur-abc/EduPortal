import { NoticeStatCards } from "@/features/dashboard/notices/overview/@stats"
import * as notices from "@/services/notices"

export default async function NoticeStatsPage() {
    const statusCounts = await notices.statusCounts()

    const published = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const drafts = statusCounts.find((s) => s.status === "draft")?.count ?? 0
    const archived = statusCounts.find((s) => s.status === "archived")?.count ?? 0
    const total = published + drafts + archived

    return <NoticeStatCards total={total} published={published} drafts={drafts} archived={archived} />
}
