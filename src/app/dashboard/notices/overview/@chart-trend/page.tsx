import { NoticePublishTrendChart } from "@/features/dashboard/notices/overview/@chart-trend"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.publishTrend()
    return <NoticePublishTrendChart data={data} />
}
