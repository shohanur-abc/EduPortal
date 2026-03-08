import { NoticePublishTrendChart } from "@/features/dashboard/notices/overview/@chart-trend"
import { Notice as notice } from "@/services"

export default async function ChartTrendPage() {
    const data = await notice.getPublishTrend()
    return <NoticePublishTrendChart data={data} />
}
