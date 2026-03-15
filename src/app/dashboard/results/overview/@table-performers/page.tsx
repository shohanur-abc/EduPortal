import { ResultTopPerformersTable } from "@/features/dashboard/results/overview/@table-performers"
import { Result } from "@/services"

export default async function TablePerformersPage() {
    const data = await Result.getTopPerformers()
    return <ResultTopPerformersTable data={data} />
}
