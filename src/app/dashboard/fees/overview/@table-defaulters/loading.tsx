import { FeeDefaultersTable } from "@/features/dashboard/fees/overview/@table-defaulters"

export default function Loading() {
    return <FeeDefaultersTable data={Array(5).fill(0).map(() => ({ studentName: "OOOOOO", rollNumber: "OOO-OOO", totalDue: 55555, count: 3 }))} loading={true} />
}
