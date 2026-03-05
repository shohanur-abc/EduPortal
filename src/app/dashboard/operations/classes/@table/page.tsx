import { ClassesCrudTable } from "@/features/dashboard/operations/classes/@table"
import { Class } from "@/services/class.service"
import { Teacher } from "@/services/teacher.service"

export default async function OperationsClassesPage() {
  const [classes, teachers] = await Promise.all([Class.getAll(), Teacher.getAll()])
  return <ClassesCrudTable classes={classes} teachers={teachers} />
}
