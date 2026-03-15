import { NoticeStatCards } from "@/features/dashboard/notices/overview/@stats"

export default function StatsLoading() {
    return (
        <NoticeStatCards
            total={22}
            published={22}
            drafts={1}
            archived={1}
            loading={true}
        />
    )
}
