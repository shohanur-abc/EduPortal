import { NoticePublishTrendChart } from "@/features/dashboard/notices/overview/@chart-trend"
export default function Loading() {
    return <NoticePublishTrendChart data={Array(6).fill(0).map(() => ({ month: "OOO", count: 0, published: 0 }))} />
}
