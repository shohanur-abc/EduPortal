import { ClassesCrudTable } from "@/features/dashboard/operations/classes/@table"

export default async function OperationsClassesPage() {
    return <ClassesCrudTable classes={classes} teachers={teachers} loading />
}

const classes = new Array(10).fill(0).map((_, i) => ({
    _id: "class-10",
    name: "Class 10 (A)",
    section: "A",
    grade: 10,
    academicYear: "2025-2026",
    classTeacherName: "Md. Tarek Islam",
    studentCount: 6,
    maxStudents: 45,
    room: "Room 501",
    subjects: ["Mathematics", "English", "Bengali", "+4"],
    status: "Active"
}))

const teachers = new Array(5).fill(0).map((_, i) => ({
    _id: `teacher-${i + 1}`,
    name: `Md. Tarek Islam`
}))