import { NoticesManageSection } from "@/features/dashboard/notices/manage/@table"

export default async function NoticesManagePage() {
    return <NoticesManageSection notices={notices} loading />
}

const notices = new Array(10).fill(0).map((_, i) => ({
    _id: `notice-${i}`,
    title: "Notice Title",
    content: "This is the content of the notice. It can be quite long and detailed.",
    authorName: "Admin User",
    priority: "Medium",
    targetAudience: ["Students", "Staff"],
    publishDate: "2023-01-01",
    expiryDate: "2023-12-31",
    status: "Published",
}))