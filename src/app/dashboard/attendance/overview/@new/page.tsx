import AttendanceChart from "@/features/dashboard/attendance/overview/@area-chart";
import { Class } from "@/services";

export default async function Page() {
    const classData = await Class.getActive()

    return (
        <AttendanceChart
            classes={classData}
            title="Student Attendance"
            description="Track student attendance over time"
            defaultTab="present"
            chartConfig={{
                present: {
                    label: "Present",
                    color: "oklch(0.65 0.22 145)",
                },
                absent: {
                    label: "Absent",
                    color: "oklch(0.62 0.23 25)",
                },
                late: {
                    label: "Late",
                    color: "oklch(0.82 0.19 85)",
                },
                excused: {
                    label: "Excused",
                    color: "oklch(0.72 0.15 260)",
                },
            }}
            data={[
                { present: 45, absent: 5, late: 8, excused: 2, },
                { present: 48, absent: 3, late: 6, excused: 3, },
                { present: 42, absent: 8, late: 10, excused: 4, },
                { present: 50, absent: 2, late: 4, excused: 2, },
                { present: 46, absent: 6, late: 9, excused: 3, },
                { present: 41, absent: 9, late: 12, excused: 2, },
                { present: 49, absent: 4, late: 5, excused: 2, },
                { present: 47, absent: 5, late: 7, excused: 3, },
                { present: 43, absent: 7, late: 11, excused: 3, },
                { present: 51, absent: 1, late: 3, excused: 1, },
                { present: 44, absent: 8, late: 10, excused: 4, },
                { present: 48, absent: 4, late: 6, excused: 2, },
                { present: 40, absent: 10, late: 14, excused: 2, },
                { present: 50, absent: 2, late: 4, excused: 2, },
                { present: 45, absent: 6, late: 8, excused: 3, },
                { present: 49, absent: 3, late: 5, excused: 1, },
                { present: 42, absent: 9, late: 12, excused: 3, },
                { present: 46, absent: 5, late: 9, excused: 4, },
                { present: 48, absent: 4, late: 7, excused: 2, },
                { present: 51, absent: 2, late: 3, excused: 2, },
                { present: 43, absent: 8, late: 11, excused: 3, },
                { present: 47, absent: 5, late: 6, excused: 2, },
                { present: 44, absent: 7, late: 10, excused: 3, },
                { present: 50, absent: 3, late: 4, excused: 1, },
                { present: 41, absent: 9, late: 13, excused: 3, },
                { present: 49, absent: 4, late: 5, excused: 2, },
                { present: 45, absent: 6, late: 8, excused: 3, },
                { present: 48, absent: 3, late: 6, excused: 2, },
                { present: 42, absent: 8, late: 11, excused: 4, },
                { present: 51, absent: 1, late: 3, excused: 1, },
            ]}

        />
    )
}

