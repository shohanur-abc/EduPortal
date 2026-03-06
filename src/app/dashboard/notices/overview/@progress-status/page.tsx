import { NoticeStatusProgress } from "@/features/dashboard/notices/overview/@progress-status"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.statusCounts()
    const total = data.reduce((s, d) => s + d.count, 0)
    return <NoticeStatusProgress data={data} total={total} />
}
