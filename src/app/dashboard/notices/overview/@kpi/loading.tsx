import { NoticeKpi } from "@/features/dashboard/notices/overview/@kpi"
export default function Loading() {
    return <NoticeKpi activeCount={33} expiringCount={3} urgentCount={3} audienceCount={3} loading={true} />
}
