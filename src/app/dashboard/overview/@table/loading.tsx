import { RecentNotices } from "@/features/dashboard/overview/@table";
import { NoticeRow } from "@/features/dashboard/overview/types";
import { fmtDate } from "@/lib/utils";

export default function Table() {
    return (
        <RecentNotices notices={mockNotices} loading />
    )
}

const mockNotices: NoticeRow[] = Array(10).fill(0).map((_, i) => ({
    _id: `notice-${i}`,
    title: `Notice Title ${i + 1}`,
    authorName: `Author ${i + 1}`,
    priority: ["low", "medium", "high", "urgent"][i % 4],
    status: ["draft", "published", "archived"][i % 3],
    publishDate: fmtDate(new Date(Date.now() - i * 86400000))
}))