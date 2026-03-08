import { ActivityFeed } from "@/components/molecules/activity-feed"
import type { NoticeItem } from "./types"

export function NoticeRecentFeed({ notices, loading }: { notices: NoticeItem[]; loading?: boolean }) {
    return (
        <ActivityFeed
            title="Recent Activity"
            description="Latest notice board updates"
            items={notices.slice(0, 8).map((n) => ({
                id: n._id,
                name: n.authorName,
                description: n.title,
                time: n.publishDate,
                badge: n.priority,
            }))}
            loading={loading}
        />
    )
}
