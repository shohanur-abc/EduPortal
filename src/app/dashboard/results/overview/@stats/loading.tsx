import { ResultStatCards } from "@/features/dashboard/results/overview/@stats"

export default function StatsLoading() {
    return (
        <ResultStatCards
            totalResults={100}
            passRate={10}
            subjectCount={10}
            topSubject={"Math"}
            topSubjectAvg={50}
            loading={true}
        />
    )
}
