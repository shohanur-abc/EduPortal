import { NoticeAudienceChart } from "@/features/dashboard/notices/overview/@chart-audience"
import { Notice } from "@/services"
export default async function Page() {
    const data = await Notice.audienceReach()
    return <NoticeAudienceChart data={data} />
}
