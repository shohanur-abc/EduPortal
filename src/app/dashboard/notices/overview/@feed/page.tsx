import { NoticeRecentFeed } from "@/features/dashboard/notices/overview/@feed"
import { Notice as notice } from "@/services"

export default async function FeedPage() {
    const notices = await notice.getRecent(8)
    return <NoticeRecentFeed notices={notices as any} />
}
