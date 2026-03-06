import { ClassesCrudTable } from "@/features/dashboard/operations/classes/@table"
import * as classesService from "@/services/classes"
import * as teachersService from "@/services/teachers"

export default async function OperationsClassesPage() {
  const [classes, teachers] = await Promise.all([classesService.getAll(), teachersService.getAll()])
  return <ClassesCrudTable classes={classes} teachers={teachers} />
}
