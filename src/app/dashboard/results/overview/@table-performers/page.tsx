import { ResultTopPerformersTable } from "@/features/dashboard/results/overview/@table-performers"
import * as results from "@/services/results"

export default async function TablePerformersPage() {
    const data = await results.topPerformers()
    return <ResultTopPerformersTable data={data} />
}
