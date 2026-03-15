import { NoticeStatCards } from "@/features/dashboard/notices/overview/@stats"

export default function StatsLoading() {
    return (
        <NoticeStatCards
            counts={[
                { status: "draft", count: 12 },
                { status: "published", count: 45 },
                { status: "archived", count: 8 },
            ]}
            loading={true}
        />
    )
}
