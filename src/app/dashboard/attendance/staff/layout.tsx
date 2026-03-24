import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
    title: "Staff Attendance | Dashboard",
    description: "Track and manage staff attendance records",
}

export default function StaffAttendanceLayout({ "table": StaffAttendanceTable }: { "table": React.ReactNode }) {
    return (
        <div className="space-y-6">
            {StaffAttendanceTable}
        </div>
    )
}
