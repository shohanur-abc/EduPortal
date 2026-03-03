import { FeeStructureTable } from "@/features/dashboard/fees/structure/@table"
import { Fee } from "@/services/fee.service"

export default async function FeeStructureTablePage() {
    const structure = await Fee.feeStructure()
    return <FeeStructureTable structure={structure} />
}
