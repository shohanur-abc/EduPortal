import { StatCards } from "@/features/dashboard/attendance/overview/@stats";

export default function StatsLoading() {
    return (
        <StatCards
            present={333}
            absent={22}
            late={22}
            excused={22}
            total={333}
            loading={true}
        />
    )
}
