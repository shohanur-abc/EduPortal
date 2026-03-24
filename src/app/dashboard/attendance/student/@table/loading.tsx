import { StudentAttendance } from "@/features/dashboard/attendance/student/@table";

export default function MarkLayout() {
    return (
        <StudentAttendance classes={classData} />
    )
}

const classData = Array.from({ length: 10 }, (_, i) => ({
    _id: `class-${i + 1}`,
    name: `Class ${i + 1}`,
    section: `Section ${String.fromCharCode(65 + i)}`,
    grade: i + 10
}));