import { NoticeSummary } from "@/features/dashboard/notices/overview/@summary"
import { Notice } from "@/services/notice.service"
export default async function Page() {
    const [statusCounts, priorityBreakdown] = await Promise.all([
        Notice.statusCounts(),
        Notice.priorityBreakdown(),
    ])
    const published = statusCounts.find((s) => s.status === "published")?.count ?? 0
    const drafts = statusCounts.find((s) => s.status === "draft")?.count ?? 0
    const total = statusCounts.reduce((s, d) => s + d.count, 0)
    const urgent = priorityBreakdown.filter((p) => ["high", "urgent"].includes(p.priority)).reduce((s, p) => s + p.count, 0)

    return <NoticeSummary total={total} published={published} drafts={drafts} urgent={urgent} />
}
