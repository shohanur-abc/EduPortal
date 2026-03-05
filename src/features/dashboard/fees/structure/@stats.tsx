import { StatCard } from "@/components/molecules/stat-card"
import { Layers, TrendingUp, Calculator } from "lucide-react"


export function FeeStructureStatCards({ totalTypes, totalCollected, totalStudents, loading }: FeeStructureStats) {
    return (
        <>
            <StatCard
                title="Fee Types"
                value={totalTypes}
                icon={Layers}
                footer="Configured fee categories"
                loading={loading}
            />
            <StatCard
                title="Total Collected"
                value={`৳${totalCollected.toLocaleString()}`}
                icon={TrendingUp}
                variant="success"
                footer="Across all fee types"
                loading={loading}
            />
            <StatCard
                title="Total Assignments"
                value={totalStudents.toLocaleString()}
                icon={Calculator}
                footer="Fee records across types"
                loading={loading}
            />
        </>
    )
}


// ========== TYPES ==========
interface FeeStructureStats {
    totalTypes: number
    totalCollected: number
    totalStudents: number
    loading?: boolean
}
