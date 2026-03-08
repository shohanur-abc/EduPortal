import { NoticeKpi } from "@/features/dashboard/notices/overview/@kpi"

export default function KpiLoading() {
    return (
        <NoticeKpi
            counts={[{ status: "published", count: 30 }, { status: "draft", count: 10 }]}
            audienceReach={[{ audience: "all", count: 40 }]}
            expiringSoon={[]}
            loading={true}
        />
    )
}
