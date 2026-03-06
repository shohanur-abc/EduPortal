import { FeeStructureTable } from "@/features/dashboard/fees/structure/@table"
import * as fees from "@/services/fees"

export default async function FeeStructureTablePage() {
    const structure = await fees.feeStructure()
    return <FeeStructureTable structure={structure} />
}
