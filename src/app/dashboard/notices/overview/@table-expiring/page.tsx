import { NoticeExpiringTable } from "@/features/dashboard/notices/overview/@table-expiring"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.getExpiringSoon()
    return <NoticeExpiringTable data={data} />
}
