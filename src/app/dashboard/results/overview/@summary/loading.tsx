import { ResultSummary } from "@/features/dashboard/results/overview/@summary"
export default function Loading() {
    return <ResultSummary avgMarks={33} passRate={33} totalResults={555} topSubject="OOOOOO" loading={true} />
}
