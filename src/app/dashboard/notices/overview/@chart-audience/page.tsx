import { NoticeAudienceChart } from "@/features/dashboard/notices/overview/@chart-audience"
import { Notice as notice } from "@/services"

export default async function ChartAudiencePage() {
    const data = await notice.getAudienceReach()
    return <NoticeAudienceChart data={data} />
}
