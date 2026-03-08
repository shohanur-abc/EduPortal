import type { Metadata } from "next"
import { CreateNoticeForm } from "@/features/dashboard/notices/create/create-notice-form"

export const metadata: Metadata = {
    title: "Create Notice | Dashboard",
    description: "Create a new notice with rich text editor",
}

export default function CreateNoticePage() {
    return <CreateNoticeForm />
}
