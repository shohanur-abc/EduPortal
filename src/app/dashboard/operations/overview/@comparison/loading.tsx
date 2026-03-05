import { OperationsStudentStatusComparison } from "@/features/dashboard/operations/overview/@comparison"
export default function Loading() {
    return <OperationsStudentStatusComparison data={[{ label: "Active", value: 555 }, { label: "Inactive", value: 33 }]} loading={true} />
}
