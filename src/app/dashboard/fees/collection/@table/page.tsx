import { FeesCollectionSection } from "@/features/dashboard/fees/collection/@table"
import { Fee } from "@/services/fee.service"
import { Student } from "@/services/student.service"

export default async function FeesCollectionPage() {
  const [records, students] = await Promise.all([Fee.getAll(), Student.getOptions()])
  console.log("Fetched records:", records)
  return <FeesCollectionSection records={records} students={students} />
}
