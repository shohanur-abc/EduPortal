import { NoticePublishTrendChart } from "@/features/dashboard/notices/overview/@chart-trend"
import { Notice } from "@/services/notice.service"
export default async function Page() {
    const data = await Notice.publishTrend()
    return <NoticePublishTrendChart data={data} />
}
