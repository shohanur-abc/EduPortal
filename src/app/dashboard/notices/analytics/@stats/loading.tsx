import { NoticeAnalyticsStatCards } from "@/features/dashboard/notices/analytics/@stats"

export default function StatsLoading() {
    return <NoticeAnalyticsStatCards
        total={22}
        published={333}
        publishRate={22}
        urgentHighCount={11}
        urgentCount={22}
        expiredPublished={11}
        loading={true}
    />
}
