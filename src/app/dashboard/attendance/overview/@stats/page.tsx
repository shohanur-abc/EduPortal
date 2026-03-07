import { StatCards } from "@/features/dashboard/attendance/overview/@stats";
import { Attendance as attendance } from "@/services";

export default async function StatsPage() {
    const data = await attendance.stats()
    return <StatCards {...data} />
}