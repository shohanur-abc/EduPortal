import { ResultTopPerformersTable } from "@/features/dashboard/results/overview/@table-performers"
import { Result } from "@/services"

export default async function TablePerformersPage() {
    const data = await Result.topPerformers()
    return <ResultTopPerformersTable data={data} />
}
