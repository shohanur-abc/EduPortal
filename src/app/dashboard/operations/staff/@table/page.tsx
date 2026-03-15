import { StaffTable } from "@/features/dashboard/operations/staff/teacher-crud"
import { Teacher } from "@/services"

export default async function StaffTablePage() {
    const teachersList = await Teacher.getAll()
    return <StaffTable teachers={teachersList} />
}
