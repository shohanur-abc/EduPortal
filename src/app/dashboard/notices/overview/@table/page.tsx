import { NoticeTable } from "@/features/dashboard/notices/overview/@table"
import { Notice as notice } from "@/services"

export default async function TablePage() {
    const notices = await notice.getAll()
    return <NoticeTable notices={notices} />
}
