import { StaffAttendance } from "@/features/dashboard/attendance/staff/@table"

export default function StaffAttendanceLoading() {
    return <StaffAttendance members={staffData} />
}

const staffData = Array.from({ length: 8 }, (_, i) => ({
    _id: `staff-${i + 1}`,
    name: `Staff Member ${i + 1}`,
    secondary: `staff${i + 1}@school.edu`,
    type: i < 5 ? "teacher" as const : "staff" as const,
    designation: i < 5 ? "Teacher (General)" : "Admin / HR",
}))
