import { FeeDefaultersTable } from "@/features/dashboard/fees/overview/@table-defaulters"
import { Fee } from "@/services"

export default async function TableDefaultersPage() {
    const data = await Fee.topDefaulters()
    return <FeeDefaultersTable data={data} />
}
