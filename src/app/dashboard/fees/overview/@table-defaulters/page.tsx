import { FeeDefaultersTable } from "@/features/dashboard/fees/overview/@table-defaulters"
import { Fee } from "@/services/fee.service"

export default async function TableDefaultersPage() {
    const data = await Fee.topDefaulters()
    return <FeeDefaultersTable data={data} />
}
