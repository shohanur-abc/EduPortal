import { StaffAttendance } from "@/features/dashboard/attendance/staff/@table"
import { Teacher, User } from "@/services"

export default async function StaffAttendancePage() {
    const [teachers, users] = await Promise.all([Teacher.getAll(), User.getAll()])

    const members = [
        ...teachers.map((teacher) => ({
            _id: teacher._id,
            name: teacher.name,
            secondary: `${teacher.email} • ${teacher.department}`,
            type: "teacher" as const,
            designation: `Teacher (${teacher.subject})`,
        })),
        ...users
            .filter((user) => user.role === "principal" || user.role === "admin")
            .map((user) => ({
                _id: user._id,
                name: user.name || user.email,
                secondary: user.email,
                type: "staff" as const,
                designation: user.role === "principal" ? "Principal" : "Admin / HR",
            })),
    ]

    return <StaffAttendance members={members} />
}
