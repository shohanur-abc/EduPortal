import { FeesCollectionSection } from "@/features/dashboard/fees/collection/@table"
import { Fee, Student as studentsService } from "@/services"

export default async function FeesCollectionPage() {
  const [records, students] = await Promise.all([Fee.getAll(), studentsService.getOptions()])
  console.log("Fetched records:", records)
  return <FeesCollectionSection records={records} students={students} />
}
