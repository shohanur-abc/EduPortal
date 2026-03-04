import { FeeStructureTable } from "@/features/dashboard/fees/structure/@table"

export default function TableLoading() {
    return <FeeStructureTable structure={data} loading />
}

const data = new Array(10).fill(0).map((_, i) => ({
    type: `development-${i + 1}`,
    totalAmount: 666666,
    avgAmount: 4444,
    count: 22,
}))