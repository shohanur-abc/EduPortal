import { RecentNoticesTable } from "@/features/dashboard/notices/overview/@table"
import { Notice } from "@/services"

export default async function NoticeTablePage() {
    const notices = await Notice.getAll()
    return <RecentNoticesTable notices={notices} />
}
