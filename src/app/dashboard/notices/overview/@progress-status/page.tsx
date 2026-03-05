import { NoticeStatusProgress } from "@/features/dashboard/notices/overview/@progress-status"
import { Notice } from "@/services/notice.service"
export default async function Page() {
    const data = await Notice.statusCounts()
    const total = data.reduce((s, d) => s + d.count, 0)
    return <NoticeStatusProgress data={data} total={total} />
}
