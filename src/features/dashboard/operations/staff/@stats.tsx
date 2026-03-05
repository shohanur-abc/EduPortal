import { StatCard } from "@/components/molecules/stat-card"
import { Users, User, BookOpen } from "lucide-react"


export function StaffStatCards({ totalTeachers, activeTeachers, activePercentage, departments, loading }: StaffStats & { loading?: boolean }) {
    return (
        <>
            <StatCard
                title="Total Teachers"
                value={totalTeachers}
                icon={Users}
                footer="All faculty members"
                loading={loading}
            />
            <StatCard
                title="Active Teachers"
                value={activeTeachers}
                icon={User}
                variant="success"
                footer={totalTeachers > 0 ? `${activePercentage}% of total staff` : "No staff records"}
                loading={loading}
            />
            <StatCard
                title="Departments"
                value={departments.length}
                icon={BookOpen}
                variant="info"
                footer={departments.slice(0, 3).join(", ") || "No departments"}
                loading={loading}
            />
        </>
    )
}


interface StaffStats {
    totalTeachers: number
    activeTeachers: number
    activePercentage: number
    departments: string[]
}
