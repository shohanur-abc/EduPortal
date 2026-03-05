import { NoticeAudienceChart } from "@/features/dashboard/notices/overview/@chart-audience"
export default function Loading() {
    return <NoticeAudienceChart data={[{ audience: "OOO", count: 0 }]} />
}
