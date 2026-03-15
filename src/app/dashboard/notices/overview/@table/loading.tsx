import { NoticeTable } from "@/features/dashboard/notices/overview/@table"

export default function TableLoading() {
    return <NoticeTable notices={mockData} loading={true} />
}

const mockData = Array(8).fill(0).map((_, i) => ({
    _id: `notice-${i}`,
    title: "Welcome Back to School!",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    authorName: "Principal Linda Carter",
    priority: "medium",
    targetAudience: ["all"],
    publishDate: "2026-02-26",
    expiryDate: "",
    status: "published",
}))
