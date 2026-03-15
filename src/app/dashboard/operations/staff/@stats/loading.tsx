import { StaffStatCards } from "@/features/dashboard/operations/staff/@stats"

export default function StatsLoading() {
    return (
        <StaffStatCards
            totalTeachers={1}
            activeTeachers={1}
            activePercentage={1}
            departments={[]}
            loading
        />
    )
}
