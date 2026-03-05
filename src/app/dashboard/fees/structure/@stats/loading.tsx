import { FeeStructureStatCards } from "@/features/dashboard/fees/structure/@stats"

export default function StatsLoading() {
    return (
        <FeeStructureStatCards
            totalTypes={22}
            totalCollected={666666}
            totalStudents={333}
            loading
        />
    )
}
