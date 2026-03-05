import { StaffTable } from "@/features/dashboard/operations/staff/teacher-crud"
import { Teacher } from "@/services/teacher.service"

export default async function StaffTablePage() {
    const teachers = await Teacher.getAll()
    return <StaffTable teachers={teachers} />
}
