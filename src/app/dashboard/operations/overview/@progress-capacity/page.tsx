import { OperationsCapacityProgress } from "@/features/dashboard/operations/overview/@progress-capacity"
import { Class } from "@/services"
export default async function Page() {
    const data = await Class.getCapacityUtilization()
    return <OperationsCapacityProgress data={data.map(d => ({ className: d.className, utilization: d.utilization }))} />
}
