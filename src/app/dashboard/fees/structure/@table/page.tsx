import { FeeStructureTable } from "@/features/dashboard/fees/structure/@table"
import { Fee } from "@/services"

export default async function FeeStructureTablePage() {
    const structure = await Fee.feeStructure()
    return <FeeStructureTable structure={structure} />
}
