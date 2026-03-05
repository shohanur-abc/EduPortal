import { OperationsSubjectCoverageTable } from "@/features/dashboard/operations/overview/@table-subjects"
export default function Loading() {
    return <OperationsSubjectCoverageTable data={Array(5).fill(0).map(() => ({ subject: "OOOOOO", count: 3, activeCount: 3 }))} loading={true} />
}
