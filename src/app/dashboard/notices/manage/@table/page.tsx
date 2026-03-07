import { NoticesManageSection } from "@/features/dashboard/notices/manage/@table"
import { Notice } from "@/services"

export default async function NoticesManagePage() {
  const notices = await Notice.getAll()
  return <NoticesManageSection notices={notices} />
}
