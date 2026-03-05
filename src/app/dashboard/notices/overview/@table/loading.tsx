import { RecentNoticesTable } from "@/features/dashboard/notices/overview/@table"

export default function TableLoading() {
    return <RecentNoticesTable notices={sampleNotice} loading />
}

const sampleNotice = new Array(10).fill(0).map((_, i) => ({
    content: "This is a sample notice content to demonstrate the loading state of the table.",
    targetAudience: ["All"],
    expiryDate: "2024-12-31",
    _id: `notice-${i}`,
    title: `Sample Notice ${i + 1}`,
    authorName: "John Doe",
    priority: "medium",
    status: "published",
    publishDate: "2024-06-01",
}))