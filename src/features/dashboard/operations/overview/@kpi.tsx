import { MetricCard } from "@/components/molecules/metric-card"
import { School, Users, GraduationCap, BookOpen } from "@/lib/icon"

export function OperationsKpi({ totalCapacity, utilization, totalSubjects, avgClassSize, loading }: OperationsKpiProps & { loading?: boolean }) {
    return (
        <>
            <MetricCard
                title="Total Capacity"
                value={totalCapacity.toLocaleString()}
                subtitle="All classes combined"
                icon={School}
                variant="default"
                loading={loading}
            />
            <MetricCard
                title="Avg Utilization"
                value={`${utilization}%`}
                subtitle="Capacity usage"
                icon={Users}
                variant={utilization >= 80 ? "success" : utilization >= 50 ? "warning" : "danger"}
                loading={loading}
            />
            <MetricCard
                title="Total Subjects"
                value={totalSubjects}
                subtitle="Across all classes"
                icon={BookOpen}
                variant="info"
                loading={loading}
            />
            <MetricCard
                title="Avg Class Size"
                value={avgClassSize}
                subtitle="Students per class"
                icon={GraduationCap}
                variant="default"
                loading={loading}
            />
        </>
    )
}

interface OperationsKpiProps {
    totalCapacity: number
    utilization: number
    totalSubjects: number
    avgClassSize: number
}
