import { FeeStructureStatCards } from "@/features/dashboard/fees/structure/@stats"
import * as fees from "@/services/fees"

export default async function FeeStructureStatsPage() {
    const structure = await fees.feeStructure()

    const totalTypes = structure.length
    const totalCollected = structure.reduce((s, item) => s + item.totalAmount, 0)
    const totalStudents = structure.reduce((s, item) => s + item.count, 0)

    return <FeeStructureStatCards totalTypes={totalTypes} totalCollected={totalCollected} totalStudents={totalStudents} />
}
