import { DashboardStats } from "@/features/dashboard/overview/@stats";
import { Dashboard } from "@/services";

export default async function StatCards() {
    const stats = await Dashboard.stats()
    return <DashboardStats stats={stats} />
}