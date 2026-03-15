import { StudentsCrudTable } from "@/features/dashboard/operations/students/@table"

export default function TableLoading() {
    return <StudentsCrudTable students={students} classes={classes} loading={true} />
}

const students = new Array(10).fill(0).map((_, i) => ({
    _id: "student-045",
    name: "Bappy Mahmud",
    email: "bappy.mahmud42@school.edu",
    rollNumber: "STU-2025-045",
    section: "AA",
    guardianName: "Guardian of Alamin",
    guardianPhone: "01711000045",
    status: "active",
    gender: "male",
    dateOfBirth: "2010-05-15",
    admissionDate: "2023-01-10",
}))

const classes = new Array(5).fill(0).map((_, i) => ({
    _id: `class-${i}`,
    name: `Bappy Mahmud`,
    section: `A`,
}))