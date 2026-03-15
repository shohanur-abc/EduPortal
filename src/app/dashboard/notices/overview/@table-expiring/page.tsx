import { NoticeExpiringTable } from "@/features/dashboard/notices/overview/@table-expiring"
import { Notice as notice } from "@/services"

export default async function TableExpiringPage() {
    const data = await notice.getExpiringSoon()
    return <NoticeExpiringTable notices={data} />
}
