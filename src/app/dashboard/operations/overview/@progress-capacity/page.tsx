import { OperationsCapacityProgress } from "@/features/dashboard/operations/overview/@progress-capacity"
import { Class } from "@/services/class.service"
export default async function Page() {
    const data = await Class.capacityUtilization()
    return <OperationsCapacityProgress data={data.map(d => ({ className: d.className, utilization: d.utilization }))} />
}
