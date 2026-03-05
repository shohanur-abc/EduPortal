import { StatCard } from "@/components/molecules/stat-card"
import { PageHeader } from "@/components/molecules/page-header"
import { EmptyState } from "@/components/molecules/empty-state"
import { Shield, Users, BookOpen } from "lucide-react"

// ============= ADMIN DASHBOARD =============
export function AdminDashboard() {
    return (
        <div className="space-y-6">
            <PageHeader title="Admin Dashboard" description="System administration and configuration" />
            <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-3">
                <StatCard title="System Status" value="Healthy" icon={Shield} variant="success" footer="All services running" />
                <StatCard title="Active Sessions" value="--" icon={Users} footer="Realtime tracking" />
                <StatCard title="Pending Tasks" value="--" icon={BookOpen} footer="Requires attention" />
            </div>
            <EmptyState
                title="Admin Panel"
                description="Full admin capabilities including system settings, backup management, and audit logs will be available here."
                icon={Shield}
                size="lg"
            />
        </div>
    )
}
