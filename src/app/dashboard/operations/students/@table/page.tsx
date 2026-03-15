import { StudentsCrudTable } from "@/features/dashboard/operations/students/@table"
import { Student as studentsService, Class as classesService } from "@/services"

export default async function StudentTablePage() {
    const [students, classes] = await Promise.all([
        studentsService.getAll(),
        classesService.getOptions(),
    ])

    return <StudentsCrudTable students={students} classes={classes} />
}
