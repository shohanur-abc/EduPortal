import { NoticeKpi } from "@/features/dashboard/notices/overview/@kpi"
import { Notice as notice } from "@/services"

export default async function KpiPage() {
    const [counts, audienceReach, expiringSoon] = await Promise.all([
        notice.getStatusCounts(),
        notice.getAudienceReach(),
        notice.getExpiringSoon(),
    ])

    return <NoticeKpi counts={counts} audienceReach={audienceReach} expiringSoon={expiringSoon} />
}
