import { NoticeExpiringTable } from "@/features/dashboard/notices/overview/@table-expiring"
import { Notice } from "@/services/notice.service"
export default async function Page() {
    const data = await Notice.getExpiringSoon()
    return <NoticeExpiringTable data={data} />
}
