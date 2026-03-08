import { NoticeRecentFeed } from "@/features/dashboard/notices/overview/@feed"

export default function FeedLoading() {
    return <NoticeRecentFeed notices={[]} loading={true} />
}
