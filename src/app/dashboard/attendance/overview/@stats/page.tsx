import { StatCards } from "@/features/dashboard/attendance/overview/@stats";
import * as attendance from "@/services/attendence";

export default async function StatsPage() {
    const data = await attendance.stats()
    return <StatCards {...data} />
}