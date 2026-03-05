import { ClassesTable } from "@/features/dashboard/operations/overview/@table"
import { Class } from "@/services/class.service"

export default async function OperationTablePage() {
    const classes = await Class.getActive()
    return <ClassesTable classes={classes} />
}
