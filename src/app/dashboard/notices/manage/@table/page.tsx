import { NoticesManageSection } from "@/features/dashboard/notices/manage/@table"
import * as noticesSvc from "@/services/notices"

export default async function NoticesManagePage() {
  const notices = await noticesSvc.getAll()
  return <NoticesManageSection notices={notices} />
}
