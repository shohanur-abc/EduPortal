import { NoticeExpiringTable } from "@/features/dashboard/notices/overview/@table-expiring"

export default function TableExpiringLoading() {
    return <NoticeExpiringTable notices={[]} loading={true} />
}
