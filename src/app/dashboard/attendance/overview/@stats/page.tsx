import { StatCards } from "@/features/dashboard/attendance/overview/@stats";
import { Attendance } from "@/services/attendance.service";

export default async function StatsPage() {
    const data = await Attendance.stats()
    return <StatCards {...data} />
}