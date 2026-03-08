import type { Metadata } from "next"
import { NoticeBoard } from "@/features/dashboard/notices/manage/notice-board"
import { Notice as notice } from "@/services"

export const metadata: Metadata = {
    title: "Manage Notices | Dashboard",
    description: "View, edit, publish, archive, and delete notices",
}

export default async function ManageNoticesPage() {
    const data = await notice.getPaginated(1, 12)
    return (
        <NoticeBoard
            initialNotices={data.items}
            initialTotal={data.total}
            initialHasMore={data.hasMore}
        />
    )
}
