import { FeeClassProgress } from "@/features/dashboard/fees/overview/@progress-classwise"
import { Fee } from "@/services/fee.service"

export default async function ProgressClasswisePage() {
    const data = await Fee.classWiseFees()
    return <FeeClassProgress data={data} />
}
