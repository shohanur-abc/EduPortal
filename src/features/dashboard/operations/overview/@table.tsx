import { SimpleTable } from "@/components/molecules/simple-table"
import { AvatarCell } from "@/components/molecules/avatar-cell"
import { Badge } from "@/components/molecules"


export function ClassesTable({ classes, loading }: { classes: ClassRow[]; loading?: boolean }) {
    return (
        <SimpleTable<ClassRow>
            title="Classes"
            description="Active classes this academic year"
            columns={[
                { key: "name", header: "Class", render: (r) => <span className="font-medium">{r.name} ({r.section})</span> },
                { key: "grade", header: "Grade" },
                { key: "classTeacherName", header: "Class Teacher", render: (r) => <AvatarCell name={r.classTeacherName} /> },
                { key: "studentCount", header: "Students", render: (r) => <span>{r.studentCount}/{r.maxStudents}</span> },
                { key: "room", header: "Room" },
                {
                    key: "subjects", header: "Subjects",
                    render: (r) => (
                        <div className="flex flex-wrap gap-1">
                            {r.subjects.slice(0, 3).map((s) => (
                                <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                            ))}
                            {r.subjects.length > 3 && <Badge variant="outline" className="text-xs">+{r.subjects.length - 3}</Badge>}
                        </div>
                    ),
                },
            ]}
            data={classes}
            keyExtractor={(r) => r._id}
            loading={loading}
        />
    )
}


interface ClassRow {
    [key: string]: unknown
    _id: string
    name: string
    section: string
    grade: number
    academicYear: string
    classTeacherName: string
    studentCount: number
    maxStudents: number
    room: string
    subjects: string[]
    status: string
}
