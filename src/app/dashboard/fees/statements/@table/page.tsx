import { FeeStatementsTable } from "@/features/dashboard/fees/statements/@table"
import { Fee } from "@/services/fee.service"

export default async function FeeStatementsTablePage() {
    const records = await Fee.getAll()
    return <FeeStatementsTable records={records} />
}
