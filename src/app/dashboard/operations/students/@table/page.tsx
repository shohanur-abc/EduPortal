import { StudentsCrudTable } from "@/features/dashboard/operations/students/@table"
import { Student } from "@/services/student.service"
import { Class } from "@/services/class.service"

export default async function StudentTablePage() {
    const [students, classes] = await Promise.all([
        Student.getAll(),
        Class.getOptions(),
    ])

    return <StudentsCrudTable students={students} classes={classes} />
}
