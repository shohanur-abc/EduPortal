"use client"
import { EmptyState } from "@/components/molecules/empty-state"
import * as React from "react"
import { Select as Select$, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStudentsForClass } from "@/features/dashboard/attendance/actions/get-students-for-class"
import { CalendarDays, CheckCircle, XCircle, Clock, AlertCircle, Users } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { markBulkAttendance } from "../../actions/mutations";


export function AttendanceMark({ classes }: { classes: ClassInfo[] }) {
    if (classes.length === 0) {
        return (
            <EmptyState
                title="No Classes Available"
                description="There are no classes assigned yet. Contact the administrator to assign classes before marking attendance."
                icon={Users}
            />
        )
    }

    return <AttendanceMarkForm classes={classes} />
}


// ============= BULK MARK ATTENDANCE =============
export function AttendanceMarkForm({ classes }: { classes: ClassInfo[] }) {
    const router = useRouter()
    const [selectedClassId, setSelectedClassId] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split("T")[0])
    const [students, setStudents] = React.useState<StudentInfo[]>([])
    const [statuses, setStatuses] = React.useState<Record<string, "present" | "absent" | "late" | "excused">>({})
    const [loading, setLoading] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)

    const selectedClass = classes.find((c) => c._id === selectedClassId)

    const handleClassSelect = async (classId: string) => {
        setSelectedClassId(classId)
        const cls = classes.find((c) => c._id === classId)
        if (!cls) return

        setLoading(true)
        try {
            const result = await getStudentsForClass(cls.section)
            setStudents(result)
            // Default all to present
            const defaultStatuses: Record<string, "present"> = {}
            result.forEach((s) => { defaultStatuses[s._id] = "present" })
            setStatuses(defaultStatuses)
        } catch {
            toast.error("Failed to load students")
        } finally {
            setLoading(false)
        }
    }

    const setStatus = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
        setStatuses((prev) => ({ ...prev, [studentId]: status }))
    }

    const markAll = (status: "present" | "absent" | "late" | "excused") => {
        const newStatuses: Record<string, typeof status> = {}
        students.forEach((s) => { newStatuses[s._id] = status })
        setStatuses(newStatuses)
    }

    const handleSubmit = async () => {
        if (!selectedClassId || students.length === 0) {
            toast.error("Select a class with students first")
            return
        }

        setSubmitting(true)
        const entries = students.map((s) => ({
            student: s._id,
            status: statuses[s._id] || "present",
        }))

        const result = await markBulkAttendance({
            classId: selectedClassId,
            date: selectedDate,
            entries,
        })

        if (result.success) {
            toast.success(result.message)
            router.refresh()
        } else {
            toast.error(result.error)
        }
        setSubmitting(false)
    }

    const statusIcon = (status: string) => {
        switch (status) {
            case "present": return <CheckCircle className="size-4 text-green-600" />
            case "absent": return <XCircle className="size-4 text-red-600" />
            case "late": return <Clock className="size-4 text-amber-600" />
            case "excused": return <AlertCircle className="size-4 text-blue-600" />
            default: return null
        }
    }

    const presentCount = Object.values(statuses).filter((s) => s === "present").length
    const absentCount = Object.values(statuses).filter((s) => s === "absent").length

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="size-5" />
                        Mark Attendance
                    </CardTitle>
                    <CardDescription>
                        Select a class and date, then mark each student&apos;s attendance status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="w-64">
                            <label className="text-sm font-medium mb-1.5 block">Class</label>
                            <Select$ onValueChange={handleClassSelect} defaultValue="" >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a class..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.map((c) => (
                                        <SelectItem key={c._id} value={c._id}>
                                            {c.name} ({c.section}) — Grade {c.grade}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select$>
                        </div>
                        <div className="w-48">
                            <label className="text-sm font-medium mb-1.5 block">Date</label>
                            <input
                                type="date"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {selectedClass && (
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{students.length} students</Badge>
                            <Badge variant="outline" className="text-green-700">{presentCount} present</Badge>
                            <Badge variant="outline" className="text-red-700">{absentCount} absent</Badge>
                        </div>
                    )}
                </CardContent>
            </Card>

            {loading && (
                <Card><CardContent className="py-8 text-center text-muted-foreground">Loading students...</CardContent></Card>
            )}

            {!loading && students.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Students — {selectedClass?.name} ({selectedClass?.section})</CardTitle>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => markAll("present")}>All Present</Button>
                                <Button size="sm" variant="outline" onClick={() => markAll("absent")}>All Absent</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y">
                            {students.map((student) => (
                                <div key={student._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        {statusIcon(statuses[student._id])}
                                        <div>
                                            <p className="text-sm font-medium">{student.name}</p>
                                            <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {(["present", "absent", "late", "excused"] as const).map((s) => (
                                            <Button
                                                key={s}
                                                size="sm"
                                                variant={statuses[student._id] === s ? "default" : "outline"}
                                                onClick={() => setStatus(student._id, s)}
                                                className="capitalize text-xs h-7 px-2"
                                            >
                                                {s}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <div className="border-t p-4 flex justify-end">
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Saving..." : "Save Attendance"}
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}


// ============= MARK SECTION =============
interface ClassInfo {
    _id: string
    name: string
    section: string
    grade: number
}

interface StudentInfo { _id: string; name: string; rollNumber: string; section: string }
