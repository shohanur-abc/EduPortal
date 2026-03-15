import { ClassesTable } from "@/features/dashboard/operations/overview/@table"
import { Class } from "@/services"

export default async function OperationTablePage() {
    const data = await Class.getActive()
    return <ClassesTable classes={data} />
}
