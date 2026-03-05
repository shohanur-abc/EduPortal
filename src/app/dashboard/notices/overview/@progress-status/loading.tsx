import { NoticeStatusProgress } from "@/features/dashboard/notices/overview/@progress-status"
export default function Loading() {
    return <NoticeStatusProgress data={[{ status: "published", count: 33 }, { status: "draft", count: 33 }]} total={33} loading={true} />
}
