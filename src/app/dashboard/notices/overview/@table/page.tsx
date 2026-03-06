import { RecentNoticesTable } from "@/features/dashboard/notices/overview/@table"
import * as noticesSvc from "@/services/notices"

export default async function NoticeTablePage() {
    const notices = await noticesSvc.getAll()
    return <RecentNoticesTable notices={notices} />
}
