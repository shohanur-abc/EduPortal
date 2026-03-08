import { NoticeSummary } from "@/features/dashboard/notices/overview/@summary"
import { Notice as notice } from "@/services"

export default async function SummaryPage() {
    const [counts, audienceReach, expiringSoon] = await Promise.all([
        notice.statusCounts(),
        notice.audienceReach(),
        notice.getExpiringSoon(),
    ])

    return <NoticeSummary counts={counts} audienceReach={audienceReach} expiringSoon={expiringSoon} />
}
