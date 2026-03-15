import { OperationStatCards } from "@/features/dashboard/operations/overview/@stats"

export default function StatsLoading() {
    return (
        <OperationStatCards
            classCount={1}
            studentCount={22}
            teacherCount={1}
            loading={true}
        />
    )
}
