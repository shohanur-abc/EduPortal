import { NoticeExpiringTable } from "@/features/dashboard/notices/overview/@table-expiring"
export default function Loading() {
    return <NoticeExpiringTable data={Array(3).fill(0).map((_, i) => ({ _id: `exp-${i}`, title: "OOOOOO", authorName: "OOOOOO", priority: "medium", expiryDate: "OOOOOO" }))} loading={true} />
}
