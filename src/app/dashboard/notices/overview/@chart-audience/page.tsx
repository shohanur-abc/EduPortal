import { NoticeAudienceChart } from "@/features/dashboard/notices/overview/@chart-audience"
import * as notices from "@/services/notices"
export default async function Page() {
    const data = await notices.audienceReach()
    return <NoticeAudienceChart data={data} />
}
