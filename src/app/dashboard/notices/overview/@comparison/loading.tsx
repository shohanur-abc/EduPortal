import { NoticePriorityComparison } from "@/features/dashboard/notices/overview/@comparison"
export default function Loading() {
    return <NoticePriorityComparison data={[{ label: "Low", value: 33 }, { label: "Medium", value: 33 }, { label: "High", value: 33 }]} loading={true} />
}
